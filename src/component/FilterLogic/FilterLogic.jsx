import React, { useEffect } from 'react';


const FilterLogic = ({
  listing,
  selectedSize,
  selectedPattern,
  selectedMaterial,
  selectedSleeves,
  selectedColour,
  selectedSort,
  setFilteredListing
})=> {
 
    
    
    
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
    
  return null
}

export default FilterLogic