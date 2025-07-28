import { useState, useEffect } from "react";
import "./Products.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const navigate = useNavigate();
  const [adminData, setAdminData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdminData(res.data);
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (deleteId) => {
    const confirmed = window.confirm(
      "Do you really want to delete this product?"
    );
    if (!confirmed) return;
    axios
      .delete(`${backendUrl}/admin/deleteproducts/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message, { position: "top-center" });
        axios
          .get(`${backendUrl}/admin/products`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setAdminData(res.data);
            console.log(res.data);
          })

          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        toast.error(error.data, { position: "top-center" });
      });
  };

  const handleUpdate =(updateId) =>{
navigate(`/admin/dashboard/${updateId}`)
  }

  return (
    <section className="adminproducts">
      <table className="admin-product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Sizes</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminData.map((items) => (
            <tr key={items.objId}>
              <td>{items.productId}</td>
              <td>{items.name}</td>
              <td>{items.gender}</td>
              <td>{items.category}</td>
              <td>₹{items.price}</td>
              <td>{items.sizes.join(" | ")}</td>

              <td className="td-img">
                <img src={items.image} alt="product" />
              </td>
              <td className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleUpdate(items.objId)}
                >
                  edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(items.objId)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Products;
