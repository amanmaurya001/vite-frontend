import React, { useState } from "react";
import "./Createproduct.css";
import axios from "axios";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gender: "",
    category: "",
    price: { original: "", offer: "" },
    rating: "",
    ratingCount: "",
    sizes: [""],
    material: [""],
    pattern: [""],
    sleeves: [""],
    color: [""],
    occasion: [""],
    overview: "",
    description: [""],
    care: [""],
    images: [""],
    tags: [""],
    productNote: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (e) => {
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

    try {
      const res = await axios.post(
        "http://localhost:1234/admin/createproducts",
        payload
      );
      toast.success(res.data.message);
      setFormData({
        id: "",
        name: "",
        gender: "",
        category: "",
        price: { original: "", offer: "" },
        rating: "",
        ratingCount: "",
        sizes: [""],
        material: [""],
        pattern: [""],
        sleeves: [""],
        color: [""],
        occasion: [""],
        overview: "",
        description: [""],
        care: [""],
        images: [""],
        tags: [""],
        productNote: "",
      });
    } catch (error) {
      toast.error("Product creation failed");
    }
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
    <div className="create-form">
      <h2>Create Product</h2>
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
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

// import React, { useState } from "react";
// import "./Createproduct.css";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CreateProduct = () => {
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     gender: "",
//     category: "",
//     originalPrice: "",
//     offerPrice: "",
//     rating: "",
//     ratingCount: "",
//     sizes: "",
//     material: "",
//     pattern: "",
//     sleeves: "",
//     color: "",
//     occasion: "",
//     overview: "",
//     description: "",
//     care: "",
//     images: "",
//     tags: "",
//     productNote: "",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Transform comma-separated strings into arrays
//     const toArray = (value) => value.split(",").map((v) => v.trim());

//     const productData = {
//       id: formData.id,
//       name: formData.name,
//       gender: formData.gender,
//       category: formData.category,
//       price: {
//         original: Number(formData.originalPrice),
//         offer: Number(formData.offerPrice),
//       },
//       rating: parseFloat(formData.rating),
//       ratingCount: parseInt(formData.ratingCount),
//       sizes: toArray(formData.sizes),
//       material: toArray(formData.material),
//       pattern: toArray(formData.pattern),
//       sleeves: toArray(formData.sleeves),
//       color: toArray(formData.color),
//       occasion: toArray(formData.occasion),
//       overview: formData.overview,
//       description: toArray(formData.description),
//       care: toArray(formData.care),
//       images: toArray(formData.images),
//       tags: toArray(formData.tags),
//       productNote: formData.productNote,
//     };

//     try {

//       axios
//         .post("http://localhost:1234/admin/createproducts", productData)
//         .then((res) => {
//           toast.success(res.data?.message, { position: "top-center" });
//            setFormData({
//           // reset the form
//           id: "",
//           name: "",
//           gender: "",
//           category: "",
//           originalPrice: "",
//           offerPrice: "",
//           rating: "",
//           ratingCount: "",
//           sizes: "",
//           material: "",
//           pattern: "",
//           sleeves: "",
//           color: "",
//           occasion: "",
//           overview: "",
//           description: "",
//           care: "",
//           images: "",
//           tags: "",
//           productNote: "",
//         });
//         })
//         .catch((err) => {
//           toast.error("tumse na ho paaye ga bachaaaaaa", { position: "top-center" });
//         });

//     } catch (error) {
//       console.error("Error creating product:", error);
//       alert("Failed to create product.");
//     }
//   };

//   return (
//     <section className="create">

//       <form className="create-form" onSubmit={handleSubmit}>
//         <div className="left">
//           <div className="form-group">
//             <label htmlFor="id">Product ID</label>
//             <input
//               type="text"
//               id="id"
//               value={formData.id}
//               onChange={handleChange}
//               placeholder="Product ID"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="name">Product Name</label>
//             <input
//               type="text"
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Name"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="gender">Gender [Men, Women]</label>
//             <input
//               type="text"
//               id="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               placeholder="Gender"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="category">Category</label>
//             <input
//               type="text"
//               id="category"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="Category"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="originalPrice">Original Price</label>
//             <input
//               type="number"
//               id="originalPrice"
//               value={formData.originalPrice}
//               onChange={handleChange}
//               placeholder="Original Price"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="offerPrice">Offer Price</label>
//             <input
//               type="number"
//               id="offerPrice"
//               value={formData.offerPrice}
//               onChange={handleChange}
//               placeholder="Offer Price"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="rating">Rating</label>
//             <input
//               type="number"
//               id="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               placeholder="Rating"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="ratingCount">Rating Count</label>
//             <input
//               type="number"
//               id="ratingCount"
//               value={formData.ratingCount}
//               onChange={handleChange}
//               placeholder="Rating Count"
//             />
//           </div>
//         </div>

//         <div className="mid">
//           <div className="form-group">
//             <label htmlFor="sizes">Sizes (comma separated)</label>
//             <input
//               type="text"
//               id="sizes"
//               value={formData.sizes}
//               onChange={handleChange}
//               placeholder="XS,S,M,L,XL"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="material">Material (comma separated)</label>
//             <input
//               type="text"
//               id="material"
//               value={formData.material}
//               onChange={handleChange}
//               placeholder="Cotton,Rayon"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="pattern">Pattern (comma separated)</label>
//             <input
//               type="text"
//               id="pattern"
//               value={formData.pattern}
//               onChange={handleChange}
//               placeholder="Floral,Solid"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="sleeves">Sleeves (comma separated)</label>
//             <input
//               type="text"
//               id="sleeves"
//               value={formData.sleeves}
//               onChange={handleChange}
//               placeholder="Short Sleeve"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="color">Color (comma separated)</label>
//             <input
//               type="text"
//               id="color"
//               value={formData.color}
//               onChange={handleChange}
//               placeholder="White"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="occasion">Occasion (comma separated)</label>
//             <input
//               type="text"
//               id="occasion"
//               value={formData.occasion}
//               onChange={handleChange}
//               placeholder="Picnic"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="overview">Overview</label>
//             <input
//               type="text"
//               id="overview"
//               value={formData.overview}
//               onChange={handleChange}
//               placeholder="White / Cotton / Picnic"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Description (comma separated)</label>
//             <input
//               type="text"
//               id="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Line 1, Line 2, Line 3"
//             />
//           </div>
//         </div>

//         <div className="right">
//           <div className="form-group">
//             <label htmlFor="care">Care (comma separated)</label>
//             <input
//               type="text"
//               id="care"
//               value={formData.care}
//               onChange={handleChange}
//               placeholder="Dry Clean, Hand Wash, Iron"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="images">Images (comma separated)</label>
//             <input
//               type="text"
//               id="images"
//               value={formData.images}
//               onChange={handleChange}
//               placeholder="link1,link2,link3"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="tags">Tags (comma separated)</label>
//             <input
//               type="text"
//               id="tags"
//               value={formData.tags}
//               onChange={handleChange}
//               placeholder="bestseller,new,cottage"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="productNote">Product Note</label>
//             <input
//               type="text"
//               id="productNote"
//               value={formData.productNote}
//               onChange={handleChange}
//               placeholder="Best Seller"
//             />
//           </div>

//           <button type="submit">Create Product</button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default CreateProduct;
