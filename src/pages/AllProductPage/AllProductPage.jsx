import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../component/ProductCard/ProductCard";
//import ProductCard from "../productCard/ProductCard";
import Filter from "../../component/FilterElements/Filter/Filter";
import Sort from "../../component/FilterElements/Sort/Sort";
import "./AllProductPage.css";
import LodingSpiner from "../../component/LodingSpiner/LodingSpiner";

const AllProductPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { navGender } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [listing, setListing] = useState([]);
  const [filteredListing, setFilteredListing] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [selectedSleeves, setSelectedSleeves] = useState([]);
  const [selectedColour, setSelectedColour] = useState([]);
  const [selectedSort, setSelectedSort] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/productlisting/${navGender}/allproducts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListing(data);
        setFilteredListing(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navGender]);
  /////////////////////
  /////////////////////
  ////////////////////
  ///////////////////

  useEffect(() => {
    let filtered = listing;
    if (selectedSize.length > 0) {
      filtered = filtered.filter((p) => {
        return p.sizes?.some((size) => selectedSize.includes(size));
      });
    }
    // Pattern
    if (selectedPattern.length > 0) {
      filtered = filtered.filter((p) => {
        return p.pattern?.some((pat) => selectedPattern.includes(pat));
      });
    }

    // Material
    if (selectedMaterial.length > 0) {
      filtered = filtered.filter((p) => {
        return p.material?.some((mat) => selectedMaterial.includes(mat));
      });
    }

    // Sleeves
    if (selectedSleeves.length > 0) {
      filtered = filtered.filter((p) => {
        return p.sleeves?.some((sl) => selectedSleeves.includes(sl));
      });
    }

    // Colour
    if (selectedColour.length > 0) {
      filtered = filtered.filter((p) => {
        return p.colour?.some((clr) => selectedColour.includes(clr));
      });
    }

    if (selectedSort.length > 0) {
      filtered = applySorting(filtered, selectedSort);
    }
    setFilteredListing(filtered);
  }, [
    listing,
    selectedSize,
    selectedPattern,
    selectedMaterial,
    selectedSleeves,
    selectedColour,
    selectedSort,
  ]);

  /////////////////////
  /////////////////////
  ////////////////////
  ///////////////////
  // Sorting function
  const applySorting = (products, sortOptions) => {
    let sorted = [...products];

    // Handle price sorting
    if (sortOptions.includes("High to Low")) {
      sorted = sorted.sort((a, b) => {
        const priceA = a.price?.original || 0;
        const priceB = b.price?.original || 0;
        return priceB - priceA;
      });
    } else if (sortOptions.includes("Low to High")) {
      sorted = sorted.sort((a, b) => {
        const priceA = a.price?.original || 0;
        const priceB = b.price?.original || 0;
        return priceA - priceB;
      });
    }

    // Handle price range filtering
    const priceRangeFilters = sortOptions.filter(
      (sort) =>
        sort.includes("₹") || sort.includes("Below") || sort.includes("Above")
    );

    if (priceRangeFilters.length > 0) {
      sorted = sorted.filter((product) => {
        const price = product.price?.original || 0;

        return priceRangeFilters.some((filter) => {
          switch (filter) {
            case "Below ₹499":
              return price < 499;
            case "₹500 - ₹999":
              return price >= 500 && price <= 999;
            case "₹1000 - ₹1499":
              return price >= 1000 && price <= 1499;
            case "₹1500 - ₹1999":
              return price >= 1500 && price <= 1999;
            case "Above ₹2000":
              return price > 2000;
            default:
              return true;
          }
        });
      });
    }

    return sorted;
  };

  /////////////////////
  /////////////////////
  ////////////////////
  ///////////////////
  // Handler function to receive size changes from Filter component
  const handleSizeChange = (sizes) => {
    setSelectedSize(sizes);
  };

  const handlePatternChange = (pattern) => {
    setSelectedPattern(pattern);
  };
  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
  };
  const handleSleevesChange = (sleeves) => {
    setSelectedSleeves(sleeves);
  };
  const handleColourChange = (colour) => {
    setSelectedColour(colour);
  };
  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };


  return (
    <>
      <section className="heading">
        <h1>{navGender} All Products</h1>
      </section>
      <section className="filter-section">
        <Filter
          onSizeChange={handleSizeChange}
          onPatternChange={handlePatternChange}
          onMaterialChange={handleMaterialChange}
          onSleevesChange={handleSleevesChange}
          onColourChange={handleColourChange}
          setIsFilterOpen={setIsFilterOpen}
        />
        <Sort onSortChange={handleSortChange} setIsSortOpen={setIsSortOpen} />
      </section>

      <section
        className="product-grid"
        style={{
          pointerEvents: isFilterOpen || isSortOpen ? "none" : "auto",
        }}
      >
        {filteredListing.length > 0 ? (
          filteredListing.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              image0={product.images[0]}
              image1={product.images[1]}
              name={product.name}
              priceOriginal={product.price?.original}
              priceOffer={product.price?.offer}
              Note={product.productNote}
            />
          ))
        ) : listing.length === 0 ? (
          <LodingSpiner />
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>
            No matching products found.
          </p>
        )}
      </section>
    </>
  );
};

export default AllProductPage;
