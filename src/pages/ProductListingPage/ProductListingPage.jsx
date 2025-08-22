import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProductListingPage.css";
// Components
import ProductCard from "../../component/ProductCard/ProductCard";
import Filter from "../../component/FilterElements/Filter/Filter";
import Sort from "../../component/FilterElements/Sort/Sort";
import FilterLogic from "../../component/FilterLogic/FilterLogic";
import LodingSpiner from "../../component/LodingSpiner/LodingSpiner";

const ProductListingPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { navGender, navCategory } = useParams();
  const location = useLocation();

  // Query param for search
  const queryParam = new URLSearchParams(location.search).get("query");

  // UI states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Data states
  const [listing, setListing] = useState([]);
  const [filteredListing, setFilteredListing] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [selectedSleeves, setSelectedSleeves] = useState([]);
  const [selectedColour, setSelectedColour] = useState([]);
  const [selectedSort, setSelectedSort] = useState([]);

  // Fetch products based on route or search
  useEffect(() => {
    setLoading(true);
    let apiUrl = "";

    if (queryParam) {
      // Search API
      apiUrl = `${backendUrl}/search?search=${queryParam}`;
    } else if (navGender && navCategory) {
      // Gender + Category
      apiUrl = `${backendUrl}/productlisting/${navGender}/${navCategory}`;
    } else if (navGender) {
      // Gender only
      apiUrl = `${backendUrl}/productlisting/${navGender}/allproducts`;
    }

    axios
      .get(apiUrl)
      .then((res) => {
        setListing(res.data);
        setFilteredListing(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [navGender, navCategory, queryParam, backendUrl]);

  return (
    <>
      {/* Page Heading */}
      <section className="heading">
        {queryParam ? (
          <div>
            <h1>Results for: {queryParam}</h1>
            <div className="search-stats">
              <span>Showing {filteredListing.length} results</span>
              <span>•</span>
              <span>{listing.length} items in collection</span>
            </div>
          </div>
        ) : (
          <div>
            <h1>
              {navGender ? navGender.charAt(0).toUpperCase() + navGender.slice(1): ""}{" "}
              {navCategory ? navCategory.charAt(0).toUpperCase() + navCategory.slice(1): "All products"}
            </h1>
            <div className="search-stats">
              <span>Showing {filteredListing.length} results</span>
              <span>•</span>
              <span>{listing.length} items in collection</span>
            </div>
          </div>
        )}
      </section>

      {/* Filter & Sort */}
      <section className="filter-section">
        <FilterLogic
          listing={listing}
          selectedSize={selectedSize}
          selectedPattern={selectedPattern}
          selectedMaterial={selectedMaterial}
          selectedSleeves={selectedSleeves}
          selectedColour={selectedColour}
          selectedSort={selectedSort}
          setFilteredListing={setFilteredListing}
        />

        <Filter
          onSizeChange={setSelectedSize}
          onPatternChange={setSelectedPattern}
          onMaterialChange={setSelectedMaterial}
          onSleevesChange={setSelectedSleeves}
          onColourChange={setSelectedColour}
          setIsFilterOpen={setIsFilterOpen}
        />

        <Sort onSortChange={setSelectedSort} setIsSortOpen={setIsSortOpen} />
      </section>

      {/* Product Grid */}
      <section
        className="product-grid"
        style={{
          pointerEvents: isFilterOpen || isSortOpen ? "none" : "auto",
        }}
      >
        {loading ? (
          <LodingSpiner />
        ) : filteredListing.length > 0 ? (
          filteredListing.map((product) => (
            <ProductCard
              key={product.id || product._id}
              productId={product.id || product._id}
              image0={product.images?.[0]}
              image1={product.images?.[1]}
              name={product.name}
              priceOriginal={product.price?.original}
              priceOffer={product.price?.offer}
              Note={product.productNote}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>
            No matching products found.
          </p>
        )}
      </section>
    </>
  );
};

export default ProductListingPage;