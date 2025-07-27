import { useState, useEffect } from "react";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Cart = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const[summary,setsummary]=useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.items);
           console.log(res.data.summary);
        setData(res.data.items);
        setsummary(res.data.summary);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRemoveFromCart = (passingItemId) => {
    axios
      .delete(`${backendUrl}/deletecartitem/${passingItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message, { position: "top-center" });
        axios
          .get(`backendurl/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.data.items);
            setData(res.data.items);
             setsummary(res.data.summary);
          })
          .catch((err) => {
            console.log(err);
          });
   
      })
      .catch((err) => {
        toast.error(res.data.message, { position: "top-center" });
      });
  };

 const handleCheckout = () => {
  axios
    .post(`${backendUrl}/checkoutsession`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      window.location.href = res.data.url; // Stripe checkout page
    })
    .catch((err) => {
      console.log(err);
    });
};

  return (
    <section className="cart-main">
      <section className="cart-products">
        {data.map((cartItem) => (
          <div className="product" key={cartItem.itemId}>
            <Link to="">
              <img src={cartItem.image} alt="" />
              <div className="product-details">
                <h4>Name:{cartItem.name}</h4>
                <h4>price:{cartItem.price?.original}</h4>
                <h4>size:{cartItem.size}</h4>
                <h4>quantity:{cartItem.quantity}</h4>
              </div>
            </Link>
            <button className="cartItem-Delete-Btn" onClick={() => handleRemoveFromCart(cartItem.itemId)}>
              X
            </button>
          </div>
        ))}
      </section>
      <section className="cart-calculation">
        <div className="cart-right-blocks">
          <h1>Order Summary</h1>
        </div>

        <div className="cart-right-blocks">
          <div className="cart-right-blocks-L">
            <h1>Sub-Total</h1>
          </div>
          <div className="cart-right-blocks-R">
            <h1>:Rs{summary.subtotal} </h1>
          </div>
        </div>

        <div className="cart-right-blocks">
          <div className="cart-right-blocks-L">
            <h1>Discount</h1>
          </div>
          <div className="cart-right-blocks-R">
            <h1>:Rs {summary.discount}</h1>
          </div>
        </div>

        <div className="cart-right-blocks">
          <div className="cart-right-blocks-L">
            <h1>Delivery</h1>
          </div>
          <div className="cart-right-blocks-R">
            <h1>:Rs {summary. deliveryCharge} </h1>
          
          </div>
        </div>

        <div
          className="cart-right-blocks"
          style={{ marginTop: "20vh", borderTop: "1px solid #2E2E2E" }}
        >
          <div className="cart-right-blocks-L">
            <h1>Total</h1>
          </div>
          <div className="cart-right-blocks-R">
            <h1>:Rs{summary.total} </h1>
          </div>
        </div>

        <div
          className="cart-right-blocks"
          style={{
            height: "35vh",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <button onClick={(handleCheckout)}>
            <h1>Checkout</h1>
          </button>
        </div>
      </section>
    </section>
  );
};

export default Cart;
