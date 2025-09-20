/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
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

  // Set default token header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
  }, [token]);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!token && savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, []);

  // Fetch all products
  useEffect(() => {
    getProductsData();
  }, []);

  // Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Please select a size");

    const cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Update quantity of a cart item
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = parseInt(quantity, 10);
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get total count of cart items
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) => {
      return (
        total +
        Object.values(sizes).reduce(
          (sum, qty) => sum + parseInt(qty || 0, 10),
          0
        )
      );
    }, 0);
  };

  // Get total cart amount
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((totalAmount, [itemId, sizes]) => {
      const itemInfo = products.find((prod) => prod._id === itemId);
      if (!itemInfo) return totalAmount;
      const subtotal = Object.values(sizes).reduce(
        (sum, qty) =>
          sum + parseInt(qty || 0, 10) * parseInt(itemInfo.price || 0, 10),
        0
      );
      return totalAmount + subtotal;
    }, 0);
  };

  // Fetch products from backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        withCredentials: true,
      });
      if (response.data.success) setProducts(response.data.products);
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch user cart from backend
  const getUserCart = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) setCartItems(response.data.cartData);
      console.log("Cart from backend:", response.data.cartData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

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

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
