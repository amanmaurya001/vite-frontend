import { useState, useEffect } from "react";
import "../WishList/WishList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const WishList = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);


    // To show Wishlist
  useEffect(() => {
    axios
      .get("http://localhost:1234/showwishlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.items);
        setData(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // To Delete WishList
  const handleRemoveFromWish = (passingItemId) => {
    axios
      .delete(`${backendUrl}/deletewishitem/${passingItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message, { position: "top-center" });
        axios
          .get(`${backendUrl}/showwishlist`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.data.items);
            setData(res.data.items);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error(res.data.message, { position: "top-center" });
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
