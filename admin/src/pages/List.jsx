import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { currency } from "../../App";
import api from "../../utils/api";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await api.get("/api/product/list");
      if (response.data.success) setList(response.data.products);
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await api.post("/api/product/remove", { id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p>All Products</p>
      {list.map((p) => (
        <div key={p._id} className="grid grid-cols-5 items-center">
          <img src={p.image[0]} className="w-12" alt="" />
          <p>{p.name}</p>
          <p>{p.category}</p>
          <p>
            {currency}
            {p.price}
          </p>
          <button onClick={() => removeProduct(p._id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default List;
