import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5)); // Limit to 4 related products
    }
  }, [products]);

  return (
    <div className="mt-24">
      <div className="text-3xl text-center py-2 ">
        <Title text1={"RELATED "} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
