import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import axios from "axios";
import toast from "react-hot-toast";
import "swiper/css";
import "../ProductPage/ProductPage.css";

const ProductPage = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { productId } = useParams();
  const [showStates, setShowStates] = useState({});
  const [product1, setProducts] = useState(null);
  const [selectSize, setSelectSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isWished, setIsWished] = useState(false);
  const [delWish, setDelWish] = useState(null);

  // To show Product page
  useEffect(() => {
    axios
      .get(`${backendUrl}/products/${productId}`)
      .then((res) => {
        setProducts(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  // To check k ye product h k nhi wishlist me
  useEffect(() => {
    if (!token || !product1?._id) return;

    axios
      .get(`${backendUrl}/showwishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        const wishIds = res.data.items.map((item) => item.productId);
        if (wishIds.includes(product1._id)) {
          const lodu = res.data.items.find(
            (item) => item.productId === product1._id
          );

          setDelWish(lodu.wishlistItemId);

          setIsWished(true);
        }
      });
  }, [product1]);

  // Add to cart
  const handleAddToCart = async () => {
    if (!selectSize) {
      toast.error("Please select a size");
      return;
    }

    const cartdata = {
      productId: product1._id,
      size: selectSize,
      quantity: quantity,
    };
    axios
      .post(`${backendUrl}/addtocart`, cartdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message, { position: "top-center" });
      })
      .catch((err) => {
        toast.error("chutiya ho ka beeee", { position: "top-center" });
      });
  };


    // wish list product add or remove
  const handleAddToWishList = async () => {
    if (!token) {
      toast.error("Login first to manage wishlist", { position: "top-center" });
      return;
    }

    try {
      if (isWished) {
        // remove
        await axios.delete(`${backendUrl}/deletewishitem/${delWish}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsWished(false);
        toast.success("Removed from wishlist", { position: "top-center" });

        axios
          .get(`${backendUrl}/products/${productId}`)
          .then((res) => {
            setProducts(res.data);
          })

          .catch((err) => {
            console.log(err);
          });
      } else {
        // add
        const wishdata = {
          productId: product1._id,
        };
        await axios.post(`${backendUrl}/addtoWishList`, wishdata, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsWished(true);
        toast.success("Added to wishlist", { position: "top-center" });



        axios
          .get(`${backendUrl}/products/${productId}`)
          .then((res) => {
            setProducts(res.data);
          })

          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsZoomed(true);
  };
  const handleSizeSelect = (size) => {
    setSelectSize(size);
  };
  const call = (id) => {
    setShowStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!product1) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="ProductPage-main">
        <div className="Product-Images">
          <div className="Scroll">
            {product1.images.slice(0, 6).map((userimg, key) => (
              <img
                key={key}
                src={userimg}
                alt=""
                onClick={() => handleImageClick(userimg)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
        <div className="Product-overview">
          <h1>{product1.name}</h1>
          <h1>MRP inclusive of all taxes</h1>
          <h1>Rs {product1.price?.original}.00</h1>
          <h1>{product1.overview}</h1>
          <h1>Sizes</h1>

          <div className="sizes">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={selectSize === size ? "active" : ""}
                onClick={() => {
                  handleSizeSelect(size);
                }}
              >
                {size}
              </button>
            ))}
          </div>
          <section className="quantity-and-wish">
            <div className="quantity">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </button>
              <div> {quantity}</div>

              <button
                onClick={() => {
                  if (quantity < 10) setQuantity(quantity + 1);
                }}
              >
                +
              </button>

            </div>

            <div
              className="wish"
              onClick={handleAddToWishList}
              style={{ backgroundColor: isWished ? "red" : " #dad2d2" }}
            ></div>

            
          </section>




          <h1>size guide</h1>
          <div className="add-to-cart">
            {/* <h2>Add to Collection</h2> */}
            <button onClick={handleAddToCart}>Add to Collection</button>
          </div>
          <h1>Delivery & Payment Options</h1>
          <h1>cash on delivery available</h1>
          <h1>Delivery Time 2-7 days</h1>
        </div>
      </section>
      <section className="Product-Info">
        <div className="discription-disc " onClick={() => call(100)}>
          <h1>Discription</h1>
        </div>
        {showStates[100] && (
          <div className="description-content">
            {product1.description.map((disc, index) => (
              <h3 key={index}>{disc}</h3>
            ))}
          </div>
        )}

        <div className="discription-material" onClick={() => call(101)}>
          <h1>Material</h1>
        </div>
        {showStates[101] && (
          <div className="description-content">
            {product1.material.map((material, index) => (
              <h3 key={index}>{material}</h3>
            ))}
          </div>
        )}

        <div className="discription-care" onClick={() => call(102)}>
          <h1>Care</h1>
        </div>
        {showStates[102] && (
          <div className="description-content">
            {product1.care.map((care, index) => (
              <h3 key={index}>{care}</h3>
            ))}
          </div>
        )}
      </section>
      <section className="Product-Suggestion">
        <h1>Recomended Outfit!</h1>
        <div className="suggestion-product">
          <img src="/PHotos/women/women-cottage/cottage-0001/1.jpg" alt="" />
          <img src="/PHotos/women/women-cottage/cottage-0001/1.jpg" alt="" />
          <img src="/PHotos/women/women-cottage/cottage-0001/1.jpg" alt="" />
          <img src="/PHotos/women/women-cottage/cottage-0001/1.jpg" alt="" />
        </div>
      </section>
      <section className="Product-YouMayLike">
        <h1>You may also like</h1>
        <div className="you-make-like-box">
          <Swiper
            className="mySwiper2"
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={10}
            slidesPerView={5}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              451: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
          >
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperslide">
              {" "}
              <div className="swiper-box">
                <img
                  src="/PHotos/women/women-cottage/cottage-0001/1.jpg"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "fill",
                    borderRadius: "8px",
                  }}
                />{" "}
                <h1>dsafjksdfgds</h1> <p>asdggasg</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {isZoomed && (
        <div className="zoom-modal" onClick={() => setIsZoomed(false)}>
          <div className="zoom-content">
            <button
              className="cancel-button"
              onClick={() => setIsZoomed(false)}
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Zoomed product image"
              className="zoomed-image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
