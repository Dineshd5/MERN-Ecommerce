import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import api from "../../utils/api";

const Add = () => {
  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, i) => img && formData.append(`image${i + 1}`, img));

      const response = await api.post("/api/product/add", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImages([false, false, false, false]);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      {/* Images upload */}
      <div className="flex gap-2">
        {images.map((img, index) => (
          <label key={index}>
            <img
              src={img ? URL.createObjectURL(img) : assets.upload_area}
              alt=""
              className="w-20"
            />
            <input
              type="file"
              hidden
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
          </label>
        ))}
      </div>
      {/* Product fields */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
      </select>
      <select
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
      >
        <option>Topwear</option>
        <option>Bottomwear</option>
        <option>Winterwear</option>
      </select>
      {/* Sizes selection */}
      <div className="flex gap-2">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <div
            key={size}
            onClick={() =>
              setSizes((prev) =>
                prev.includes(size)
                  ? prev.filter((s) => s !== size)
                  : [...prev, size]
              )
            }
          >
            <p
              className={`${
                sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              {size}
            </p>
          </div>
        ))}
      </div>
      <label>
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        Bestseller
      </label>
      <button type="submit" className="bg-black text-white py-2 px-4">
        Add Product
      </button>
    </form>
  );
};

export default Add;
