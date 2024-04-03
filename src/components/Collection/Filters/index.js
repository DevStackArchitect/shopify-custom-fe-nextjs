import React, { useState } from "react";
import Select from "react-select";
import styles from "./styles.module.scss";
import { colourStyles, includedOptions } from "@/const/customSelect";
import { sortOptions } from "@/const/Collection";
import Image from "next/image";
import CustomSelect from "@/components/Shared/CustomSelect";
import InputOption from "@/components/Shared/CustomSelect/Options";

const CollectionFilters = ({ data, onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  if (!data) {
    return <div>Loading...</div>;
  }

  const availabilityOptions = [
    { value: "inStock", label: `In Stock (${data?.inStockCount})` },
    { value: "outOfStock", label: `Out of Stock (${data?.outOfStockCount})` },
  ];

  const variantOptions =
    data.variantOptions &&
    Object.entries(data.variantOptions).map(([key, values]) => ({
      label: key,
      options: values.map((value) => ({ value, label: value })),
    }));

  const productTypeOptions =
    data?.productTypes?.length > 0
      ? data.productTypes.map((type) => ({ value: type, label: type }))
      : [];

  const handleSelectChange = (selectedOptions, { name }) => {
    let updatedFilters = { ...selectedFilters };

    if (name === "productType" || name === "productVendor") {
      updatedFilters[name] = selectedOptions.map((option) => option.value);
    } else if (name === "availability") {
      updatedFilters.available = selectedOptions.some(
        (option) => option.value === "inStock",
      );
    } else if (name === "sort") {
      updatedFilters.sort = selectedOptions.value;
    } else {
      // For variant options like color, size, etc.
      updatedFilters[name] = selectedOptions.map((option) => ({
        name,
        value: option.value,
      }));
    }

    // Remove availability filter if no option is selected
    if (name === "availability" && selectedOptions.length === 0) {
      delete updatedFilters.available;
    }
    setSelectedFilters(updatedFilters);
    onFiltersChange && onFiltersChange(updatedFilters);
  };

  return (
    <div className={styles.wrapper}>

      <div className={styles.filterList}>
        <div className={styles.selectWrapper}>
          <Select
            isClearable={false}
            isSearchable={false}
            hideSelectedOptions={false}
            isMulti
            name="availability"
            options={availabilityOptions}
            className={styles.select}
            onChange={handleSelectChange}
            placeholder="Availability"
            closeMenuOnSelect={false}
            components={{
              Option: InputOption,
            }}
            styles={colourStyles}
          />
        </div>
        {variantOptions?.map((variant, index) => {
          if (!includedOptions.includes(variant.label)) return null;
          return (
            <div className={styles.selectWrapper}>
              <Select
                key={index}
                isMulti
                isClearable={false}
                isSearchable={false}
                hideSelectedOptions={false}
                name={variant.label}
                options={variant.options}
                className={styles.select}
                onChange={handleSelectChange}
                placeholder={variant.label}
                closeMenuOnSelect={false}
                styles={colourStyles}
                components={{
                  Option: InputOption,
                }}
              />
            </div>
          );
        })}
        <div className={styles.selectWrapper}>
          <Select
            isMulti
            isClearable={false}
            isSearchable={false}
            hideSelectedOptions={false}
            name="productType"
            options={productTypeOptions}
            className={styles.select}
            onChange={handleSelectChange}
            placeholder="Product Type"
            styles={colourStyles}
            closeMenuOnSelect={false}
          />
        </div>
        <div className={styles.selectWrapper}>
          <Select
            name="sort"
            isClearable={false}
            isSearchable={false}
            hideSelectedOptions={false}
            options={sortOptions}
            className={styles.select}
            onChange={handleSelectChange}
            placeholder="Sort"
            styles={colourStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionFilters;
