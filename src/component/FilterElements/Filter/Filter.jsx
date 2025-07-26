import React, { useState } from "react";
import CancelElement from "../cancelElement/CancelElement";
import "../Filter/Filter.css";
const Filter = ({
  onSizeChange,
  onPatternChange,
  onMaterialChange,
  onSleevesChange,
  onColourChange,
  setIsFilterOpen
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState({});

  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [selectedSleeves, setSelectedSleeves] = useState([]);
  const [selectedColour, setSelectedColour] = useState([]);

  /////////////////////// S I Z E ///////////////////////////////////////////////

  const handleSizeClick = (size) => {
    let updateSizes;
    if (selectedSize.includes(size)) {
      updateSizes = selectedSize.filter((s) => s !== size);
    } else {
      updateSizes = [...selectedSize, size];
    }
    setSelectedSize(updateSizes);
    onSizeChange(updateSizes);
  };
  /////////////////////// P A T T E R N ///////////////////////////////////////////////
  const handlePatternClick = (pattern) => {
    let updatePattern;
    if (selectedPattern.includes(pattern)) {
      updatePattern = selectedPattern.filter((p) => p !== pattern);
    } else {
      updatePattern = [...selectedPattern, pattern];
    }
    setSelectedPattern(updatePattern);
    onPatternChange(updatePattern);
  };
  /////////////////////// m a t e r i a l  ///////////////////////////////////////////////
  const handleMaterialClick = (material) => {
    let updateMaterial;
    if (selectedMaterial.includes(material)) {
      updateMaterial = selectedMaterial.filter((m) => m !== material);
    } else {
      updateMaterial = [...selectedMaterial, material];
    }
    setSelectedMaterial(updateMaterial);
    onMaterialChange(updateMaterial);
  };
  /////////////////////// s l e e v e s ///////////////////////////////////////////////
  const handleSleevesClick = (sleeves) => {
    let updateSleeves;
    if (selectedSleeves.includes(sleeves)) {
      updateSleeves = selectedSleeves.filter((sl) => sl !== sleeves);
    } else {
      updateSleeves = [...selectedSleeves, sleeves];
    }
    setSelectedSleeves(updateSleeves);
    onSleevesChange(updateSleeves);
  };
  /////////////////////// C o l o u r  ///////////////////////////////////////////////
  const handleColourClick = (colour) => {
    let updateColour;
    if (selectedColour.includes(colour)) {
      updateColour = selectedColour.filter((c) => c !== colour);
    } else {
      updateColour = [...selectedColour, colour];
    }
    setSelectedColour(updateColour);
    onColourChange(updateColour);
  };

 const call = (id) => {
  setIsMenuOpen((prev) => {
    const updated = !prev[id];
    setIsFilterOpen(updated); // 👈 yeh line add karni hai
    return {
      ...prev,
      [id]: updated,
    };
  });
};
  return (
    <>
      <section className="filter" onClick={() => call(2)}>
        <h3>Filter</h3>
        <img src="/PHotos/index/edit.png" alt="" />
      </section>
      {isMenuOpen[2] && (
        <>
          <div
            className="filter-overlay"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("clicked overlay");
              call(2);
            }}
          ></div>
          <div className="filter-menu">
            <CancelElement onClose={() => call(2)} />

            {/* sizes */}
            <div className="filter-menu-box">
              <h3>Sizes</h3>
              <div className="btn-wrapp">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className={selectedSize.includes(size) ? "active" : ""}
                    onClick={() => {
                      handleSizeClick(size);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* pattern */}
            <div className="filter-menu-box">
              <h3>Pattern</h3>
              <div className="btn-wrapp-type-2">
                {[
                  "Solid",
                  "Floral",
                  "Checked",
                  "Striped",
                  "Printed",
                  "Corset",
                ].map((pattern) => (
                  <button
                    key={pattern}
                    className={
                      selectedPattern.includes(pattern) ? "active" : ""
                    }
                    onClick={() => {
                      handlePatternClick(pattern);
                    }}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>
            {/* material */}
            <div className="filter-menu-box">
              <h3>Material</h3>
              <div className="btn-wrapp">
                {["Cotton", "Silk", "Linen", "Wool"].map((material) => (
                  <button
                    key={material}
                    className={
                      selectedMaterial.includes(material) ? "active" : ""
                    }
                    onClick={() => {
                      handleMaterialClick(material);
                    }}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>
            {/* sleeves */}
            <div className="filter-menu-box">
              <h3>Sleeves</h3>
              <div className="btn-wrapp-type-2">
                {["Short", "Long", "Half", "Sleeveless", "Cap"].map(
                  (Sleeves) => (
                    <button
                      key={Sleeves}
                      className={
                        selectedSleeves.includes(Sleeves) ? "active" : ""
                      }
                      onClick={() => {
                        handleSleevesClick(Sleeves);
                      }}
                    >
                      {Sleeves}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Colour */}
            <div className="filter-menu-box">
              <h3>Colour</h3>
              <div className="btn-wrapp">
                {["red", "green", "blue", "yellow", "violet"].map((colour) => (
                  <button
                    key={colour}
                    className={selectedColour.includes(colour) ? "active" : ""}
                    onClick={() => {
                      handleColourClick(colour);
                    }}
                  >
                    {colour}
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

export default Filter;
