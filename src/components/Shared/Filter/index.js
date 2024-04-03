import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
const FilterOptions = ({ label, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    onChange && onChange(value);
    setIsOpen(false);
  };
  return (
    <div className={styles.wrapper} onClick={toggleDropdown}>
      {label && <label htmlFor="">{label}</label>}
      <div className={styles.dropdown}>
        {selectedOption || "Choose"}
        {isOpen && (
          <ul className={styles.dropdownOptions}>
            {options?.map((option) => {
              if (!option || option === "") return null;
              return (
                <li
                  className={styles.dropdownOption}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Image
        src={"/images/chevron-right.svg"}
        alt={""}
        width={10}
        height={10}
      />
    </div>
  );
};
export default FilterOptions;
