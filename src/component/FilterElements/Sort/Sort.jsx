import React, { useState } from "react";
import CancelElement from "../cancelElement/CancelElement";
import "../Sort/Sort.css";

const Sort = ({ onSortChange, setIsSortOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState({});
  const [selectedSort, setselectedSort] = useState([]);

 const call = (id) => {
  setIsMenuOpen((prev) => {
    const updated = !prev[id];
    setIsSortOpen(updated); // 👈 yeh line add karni hai
    return {
      ...prev,
      [id]: updated,
    };
  });
};

  const handleSortClick = (sort) => {
    let updateSort;
    if (selectedSort.includes(sort)) {
      updateSort = selectedSort.filter((sor) => sor !== sort);
    } else {
      updateSort = [...selectedSort, sort];
    }
    setselectedSort(updateSort);
    onSortChange(updateSort);
  };

  return (
    <>
      <section className="sort" onClick={() => call(3)}>
        <h3>Sort</h3>
        <img src="/PHotos/index/edit.png" alt="" />
      </section>
      {isMenuOpen[3] && (

        <>
         <div
            className="sort-overlay"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("clicked overlay");
              call(2);
            }}
          ></div>
        <div className="sort-menu">
          <CancelElement onClose={() => call(3)} />
          <div className="sort-menu-box">
            <h3>Sort</h3>
            <div className="sort-btn-wrapp">
              {[
                "High to Low",
                "Low to High",
                "Below ₹499",
                "₹500 - ₹999",
                "₹1000 - ₹1499",
                "₹1500 - ₹1999",
                "Above ₹2000",
              ].map((sort) => (
                <button
                  key={sort}
                  className={selectedSort.includes(sort) ? "active" : ""}
                  onClick={() => {
                    handleSortClick(sort);
                  }}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Sort;
