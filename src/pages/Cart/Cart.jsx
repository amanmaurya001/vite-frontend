import { useState, useEffect } from "react";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AddressSelection from "../../component/AddressSelection/AddressSelection";
const Cart = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [summary, setsummary] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  //for checkout
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendUrl}/cart`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.items);
        setsummary(res.data.summary);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        toast.error(
          err.response?.data?.message || "Failed to load cart items.",
          { position: "top-center" }
        );
      });
  }, []);

  const handleRemoveFromCart = (passingItemId) => {
    axios
      .delete(`${backendUrl}/deletecartitem/${passingItemId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message, { position: "top-center" });

        // 🔹 Re-fetch updated cart
        axios
          .get(`${backendUrl}/cart`, {
            withCredentials: true,
          })
          .then((res) => {
            setData(res.data.items);
            setsummary(res.data.summary);
          })
          .catch((err) => {
            console.error("Error refreshing cart after delete:", err);
            toast.error(
              err.response?.data?.message || "Failed to refresh cart.",
              { position: "top-center" }
            );
          });
      })
      .catch((err) => {
        console.error("Error removing cart item:", err);
        toast.error(
          err.response?.data?.message || "Failed to remove item from cart.",
          { position: "top-center" }
        );
      });
  };

  const handleCheckout = () => {
    if (!selectedAddressId) {
      toast.error("Please select an address before checkout.", {
        position: "top-center",
      });
      return;
    }
    if (!selectPaymentMethod) {
      toast.error("Please select a payment method.", {
        position: "top-center",
      });
      return;
    }

    axios
      .post(
        `${backendUrl}/checkoutsession`,
        { addressId: selectedAddressId, paymentMethod: selectPaymentMethod },
        { withCredentials: true }
      )
      .then((res) => {
        window.location.href = res.data.url; // Redirect to Stripe
      })
      .catch((err) => {
        console.error("Checkout error:", err);
        toast.error(
          err.response?.data?.message || "Checkout failed. Please try again.",
          { position: "top-center" }
        );
      });
  };

  const toggleAddress = () => setShowAddress((prev) => !prev);

  const handleAddressSelected = (id) => {
    setSelectedAddressId(id);
  };
  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
  };
  return (
    <>
      <section className="cart-main">
        <section className="cart-products">
          {data.map((cartItem) => (
            <div className="product" key={cartItem.itemId}>
              <Link to="">
                <img src={cartItem.image} alt="" />
                <div className="product-details">
                  <h4>Name: {cartItem.name}</h4>
                  <h4>price: {cartItem.price?.original}</h4>
                  <h4>size: {cartItem.size}</h4>
                  <h4>quantity: {cartItem.quantity}</h4>
                </div>
              </Link>
              <button
                className="cartItem-Delete-Btn"
                onClick={() => handleRemoveFromCart(cartItem.itemId)}
              >
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
              <h1>:Rs {summary.deliveryCharge} </h1>
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
            <button onClick={toggleAddress}>
              <h1>Checkout</h1>
            </button>
          </div>
        </section>
      </section>
      {/* ✅ Address UI dikhana hai, button gayab nahi karna */}
      {showAddress && (
        <AddressSelection
          onSelect={handleAddressSelected}
          onPaymentSelect={handlePaymentSelect}
          onCancel={toggleAddress}
          paymentInitiate={handleCheckout}
        />
      )}
    </>
  );
};

export default Cart;
