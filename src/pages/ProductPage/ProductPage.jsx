import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RandomSwiper from "../../component/RandomSwiper/RandomSwiper";
import LodingSpiner from "../../component/LodingSpiner/LodingSpiner";
import axios from "axios";
import toast from "react-hot-toast";
import "swiper/css";
import "../ProductPage/ProductPage.css";

// Custom modular components
import ProductImages from "../../component/ProductPageElements/productimages";
import ProductOverview from "../../component/ProductPageElements/productOverview";
import ProductInfo from "../../component/ProductPageElements/productinfo";
import ZoomModal from "../../component/ProductPageElements/zoom";

const ProductPage = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // URL se productId fetch karna
  const { productId } = useParams();

  // UI & data states
  const [showStates, setShowStates] = useState({}); // Accordion toggle state
  const [product1, setProducts] = useState(null); // Product data
  const [selectSize, setSelectSize] = useState(""); // Selected size
  const [quantity, setQuantity] = useState(1); // Quantity selector
  const [isZoomed, setIsZoomed] = useState(false); // Image zoom modal control
  const [selectedImage, setSelectedImage] = useState(""); // Image for zoom modal
  const [isWished, setIsWished] = useState(false); // Wishlist status
  const [delWish, setDelWish] = useState(null); // Wishlist item ID for removal

  // User token


  // ✅ Product details fetch on mount or when productId changes
  useEffect(() => {
    axios
      .get(`${backendUrl}/products/${productId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  // ✅ Wishlist check if product already exists in user's wishlist
  useEffect(() => {
    if ( !product1?._id) return;

    axios
      .get(`${backendUrl}/showwishlist`, {
     withCredentials: true,
      })
      .then((res) => {
        const wishIds = res.data.items.map((item) => item.productId);
        if (wishIds.includes(product1._id)) {
          const wishItem = res.data.items.find(
            (item) => item.productId === product1._id
          );
          setDelWish(wishItem.wishlistItemId);
          setIsWished(true);
        }
      });
  }, [product1]);

  // ✅ Add to cart handler
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
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message, { position: "top-center" });
      })
      .catch(() => {
        toast.error("please login ", { position: "top-center" });
        navigate("/login");
      });
  };

  // ✅ Add / Remove wishlist handler
  const handleAddToWishList = async () => {


    try {
      if (isWished) {
        // Remove from wishlist
        await axios.delete(`${backendUrl}/deletewishitem/${delWish}`, {
       withCredentials: true,
        });
        setIsWished(false);
        toast.success("Removed from wishlist", { position: "top-center" });

        // Refresh product data
        axios.get(`${backendUrl}/products/${productId}`).then((res) => {
          setProducts(res.data);
        });
      } else {
        // Add to wishlist
        const wishdata = { productId: product1._id };
        await axios.post(`${backendUrl}/addtoWishList`, wishdata, {
           withCredentials: true,
        });
        setIsWished(true);
        toast.success("Added to wishlist", { position: "top-center" });

        // Refresh product data
        axios.get(`${backendUrl}/products/${productId}`).then((res) => {
          setProducts(res.data);
        });
      }
    } catch (err) {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };

  // ✅ Image click handler for zoom
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsZoomed(true);
  };

  // ✅ Size select handler
  const handleSizeSelect = (size) => {
    setSelectSize(size);
  };

  // ✅ Accordion toggle handler
  const call = (id) => {
    setShowStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ Loading state
  if (!product1) {
    return <LodingSpiner />;
  }

  return (
    <>
      {/* Main product view */}
      <section className="ProductPage-main">
        <ProductImages images={product1.images} onImageClick={handleImageClick} />

        <ProductOverview
          product={product1}
          selectSize={selectSize}
          onSelectSize={handleSizeSelect}
          quantity={quantity}
          onQuantityChange={setQuantity}
          isWished={isWished}
          onWishToggle={handleAddToWishList}
          onAddToCart={handleAddToCart}
        />
      </section>

      {/* Product info accordion */}
      <ProductInfo product={product1} showStates={showStates} onToggle={call} />

      {/* Suggested outfit section */}
      <section className="Product-Suggestion">
        <h1>Recomended Outfit!</h1>
        <div className="suggestion-product">
          <img src="/PHotos/women/women-cottage/cottage-0001/1.jpg" alt="" />
          <img src="/PHotos/women/women-cottage/cottage-0001/1.jpg" alt="" />
          <img src="/PHotos/women/women-cottage/cottage-0001/1.jpg" alt="" />
          <img src="/PHotos/women/women-cottage/cottage-0001/1.jpg" alt="" />
        </div>
      </section>

      {/* You may also like section */}
      <section className="Product-YouMayLike">
        <h1>You may also like</h1>
        <div className="you-make-like-box">
          {product1 && <RandomSwiper Gender={product1.gender} />}
        </div>
      </section>

      {/* Image zoom modal */}
      {isZoomed && (
        <ZoomModal
          imageSrc={selectedImage}
          onClose={() => setIsZoomed(false)}
        />
      )}
    </>
  );
};

export default ProductPage;
