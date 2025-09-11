import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/shopContext";
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
  const { ProductId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id == ProductId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [ProductId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                className="w-[24%]  sm:w-full  sm:mb-3 flex-shrink-0 cursor-pointer border-gray-300 "
              />
            ))}
          </div>
          <div className="w-full sm:s-[80%]">
            <img src={image} className="w-full h-auto" />
          </div>
        </div>
        {/* product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 ">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2 ">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5  text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-2 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border-amber-50 border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500 " : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className=" text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Orginal product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and preview section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm"> Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            A E-commerce product page typically includes a variety of elements
            designed to showcase the product and encourage users to make a
            purchase. Key components often include high-quality images, detailed
            descriptions, pricing information, and customer reviews.
          </p>
          <p>
            The layout is usually clean and organized, with a focus on user
            experience. Features such as size and color options, quantity
            selectors, and "Add to Cart" buttons are prominently displayed.
            Additionally, trust signals like secure payment icons and return
            policies may be included to reassure customers.
          </p>
        </div>
      </div>
      {/* display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
