/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token }, withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get total count of cart items
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          totalCount += parseInt(cartItems[itemId][size], 10);
        } catch (error) {
          console.error("Error parsing cart item count:", error);
        }
      }
    }
    return totalCount;
  };

  // Update quantity of cart item
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = parseInt(quantity, 10);
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token }, withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get total amount of cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((prod) => prod._id === itemId);
      for (const size in cartItems[itemId]) {
        try {
          totalAmount +=
            parseInt(cartItems[itemId][size], 10) *
            parseInt(itemInfo.price, 10);
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }
    return totalAmount;
  };

  // Fetch products from backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch user's cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token }, withCredentials: true }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Effects
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
