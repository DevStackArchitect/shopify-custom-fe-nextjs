import {useEffect, useState} from "react";
import * as styles from "./styles.module.scss";
import Select from "react-select";
import InputOption from "./Options";

const colourStyle = {
  container: (styles) => ({
    ...styles,
    ":focus": {
      boxShadow: "none",
      border: `none`,
    },
    ":hover": {
      boxShadow: "none",
      border: `none`,
    },
    cursor: `pointer`,
  }),
  control: (styles) => ({
    ...styles,
    width: `100%`,
    padding: "0px 14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.3s",
    height: "32px",
    fontSize: "10px",
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
    margin: `15px 0 0`,
  }),
  singleValue: (styles) => ({
    ...styles,
    margin: 0,
  }),
  multiValue: (styles) => ({
    ...styles,
    padding: `2px 0px`,
    background: `transparent`,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    display: `none`,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: `#000`,
    fontSize: 10,
    fontWeight: 400,
    padding: 0,
    paddingLeft: 0,
    ":last-child": {
      ":after": {
        content: `" "`,
      },
    },
    ":after": {
      content: `","`,
    },
  }),
  menu: (styles) => ({
    ...styles,
    padding: `6px 0px`,
    borderRadius: 4,
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: `#FFF`,
  }),
  menuPortal: (styles) => ({
    ...styles,
    background: `red`,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    paddingRight: 0,
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: `transparent`,
    position: `relative`,
    padding: 7,
    cursor: "pointer",
    fontSize: 10,
    ":after": {
      position: `absolute`,
      content: `" "`,
      height: 1,
      background: `#D9D9D9`,
      left: 20,
      right: 20,
      bottom: -2,
    },
    ":last-child": {
      ":after": {
        background: `#FFF`,
      },
    },
    ":active": {
      backgroundColor: `#DCEBFC`,
    },
    ":hover": {
      backgroundColor: `#DCEBFC !important`,
    },
    ":focus": {
      backgroundColor: `#DCEBFC !important`,
    },
    ":focus-visible": {
      backgroundColor: `#DCEBFC !important`,
    },
    ":focus-within": {
      backgroundColor: `#DCEBFC !important`,
    },
  }),
};

const CustomSelect = ({ label, options, isMultiSelect, onChange, value }) => {
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedOpt, setSelectedOpt] = useState();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Set the default value when the component mounts
    if (value && options.length > 0) {
      const defaultVal = isMultiSelect
        ? options.filter((option) => value.includes(option.value))
        : options.find((item) => item.value === value);
      setSelectedOpt(defaultVal);
      if (isMultiSelect) {
        setSelectedOptions(defaultVal.map((val) => val.id));
      } else {
        setSelectedOptions(value);
      }
    }
  }, [value, options]);

  return (
    <div className={styles.selectWrapper}>
      <Select
        isMulti={isMultiSelect}
        isClearable={false}
        isSearchable={false}
        closeMenuOnSelect={!isMultiSelect}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={selectedOpt}
        defaultValue={selectedOptions}
        hideSelectedOptions={false}
        onChange={(options) => {
          if (Array.isArray(options)) {
            setSelectedOptions(options.map((opt) => opt.value));
            onChange(options.map((opt) => opt.value));
          } else if (options) {
            setSelectedOptions([options?.value]);
            onChange(options?.value);
          } else {
            setSelectedOptions(null);
            onChange(null);
          }
        }}
        styles={colourStyle}
        placeholder=""
        options={options}
        delimiter=","
        components={{
          Option: InputOption,
        }}
      />
      <label
        className={`${styles.labelStyles}${
          selectedOptions && styles.floatingLabelStyles
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomSelect;
