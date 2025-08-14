import { useState, useEffect } from "react";
import "../WishList/WishList.css";
import ProductCard from "../../component/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const WishList = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  // Wishlist show karne ke liye
  useEffect(() => {
    axios
      .get(`${backendUrl}/showwishlist`, {
 
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.items || []);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Unable to load wishlist", {
          position: "top-center",
        });
      });
  }, []);

  // Wishlist se item delete karne ke liye
  const handleRemoveFromWish = (passingItemId) => {
    axios
      .delete(`${backendUrl}/deletewishitem/${passingItemId}`, {
         withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Item removed", {
          position: "top-center",
        });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to remove item", {
          position: "top-center",
        });
      });
  };

  return (
    <>
      <div className="wishList">
        <h1>WishList</h1>
        <div className="wishList-grid">
          {data.map((cartItem) => (
            <div className="wish-product" key={cartItem.wishlistItemId}>
              <Link to={cartItem.Link}>
                <img src={cartItem.image} alt="" />
                <h3>{cartItem.name}</h3>
                <h4>Rs {cartItem.price?.original}.00</h4>
              </Link>
              <button
                className="wishList-Delete-Btn"
                onClick={() => handleRemoveFromWish(cartItem.wishlistItemId)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WishList;
