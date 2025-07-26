import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./EditProducts.css";

const EditProducts = () => {
  // const { SingleProductId} = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gender: "",
    category: "",
    price: { original: "", offer: "" },
    rating: "",
    ratingCount: "",
    sizes: [],
    material: [],
    pattern: [],
    sleeves: [],
    color: [],
    occasion: [],
    overview: "",
    description: [],
    care: [],
    images: [],
    tags: [],
    productNote: "",
   
  });

  useEffect(() => {
    axios
      .get(
        "http://localhost:1234/admin/singleproducts/687e6af2e115e0b0acd1cfb4",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setFormData(res.data))
      .catch((err) => toast.error("Failed to fetch product"));
  }, [token]);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleRemoveField = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData({ ...formData, [field]: updated });
  };













  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: {
        original: Number(formData.price.original),
        offer: Number(formData.price.offer),
      },
      rating: parseFloat(formData.rating),
      ratingCount: parseInt(formData.ratingCount),
    };

    axios
      .put("http://localhost:1234/admin/updateproducts/687e6af2e115e0b0acd1cfb4", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Product updated");
        navigate("/admin/dashboard/all-products");
      })
      .catch(() => toast.error("Update failed"));
  };




























  
  const renderArrayInputs = (field, label) => (
    <div className="form-section">
      <label>{label}:</label>

      {formData[field].map((item, i) => (
        <div className="array-item" key={i}>
       
          <input
            value={item}
            onChange={(e) => handleArrayChange(field, i, e.target.value)}
            placeholder={`${label} ${i + 1}`}
          />

          <button type="button" onClick={() => handleRemoveField(field, i)}>
            ❌
          </button>
        </div>
      ))}

      <button
        type="button"
        className="add-btn"
        onClick={() => handleAddField(field)}
      >
        + Add {label}
      </button>
    </div>
  );

  return (
    <div className="edit-form">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
         <div className="form-row">
          <div className="form-row-column">
            <label>Product ID</label>
            <input
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Product ID"
            />
          </div>
          <div className="form-row-column">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
            />
          </div>

          <div className="form-row-column">
            <label>Gender</label>
            <input
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Men / Women"
            />
          </div>
          <div className="form-row-column">
            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
          </div>
          <div className="form-row-column">
            <label>Original Price</label>
            <input
              name="original"
              value={formData.price.original}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: { ...formData.price, original: e.target.value },
                })
              }
              placeholder="Original Price"
            />
          </div>
          <div className="form-row-column">
            <label>Offer Price</label>
            <input
              name="offer"
              value={formData.price.offer}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: { ...formData.price, offer: e.target.value },
                })
              }
              placeholder="Offer Price"
            />
          </div>
          <div className="form-row-column">
            <label>Rating</label>
            <input
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
            />
          </div>
          <div className="form-row-column">
            <label>Rating Count</label>
            <input
              name="ratingCount"
              value={formData.ratingCount}
              onChange={handleChange}
              placeholder="Rating Count"
            />
          </div>
        </div>

       

        {renderArrayInputs("sizes", "Size")}
        {renderArrayInputs("material", "Material")}
        {renderArrayInputs("pattern", "Pattern")}
        {renderArrayInputs("sleeves", "Sleeve")}
        {renderArrayInputs("color", "Color")}
        {renderArrayInputs("occasion", "Occasion")}
        {renderArrayInputs("description", "Description")}
        {renderArrayInputs("care", "Care")}
        {renderArrayInputs("images", "Image")}
        {renderArrayInputs("tags", "Tag")}

        <div className="form-section">
          <label>Overview:</label>
          <input
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            placeholder="Overview"
          />
        </div>

        <div className="form-section">
          <label>Product Note:</label>
          <input
            name="productNote"
            value={formData.productNote}
            onChange={handleChange}
            placeholder="Product Note"
          />
        </div>

   

        <button type="submit" className="submit-btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
