export const colourStyles = {
  container: (styles) => ({
    ...styles,
    padding: `2px 5px`,
    ":focus": {
      boxShadow: "none",
      outline: "none",
    },
    ":hover": {
      boxShadow: "none",
      outline: "none",
    },
    cursor: `pointer`,
    minWidth: 150,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: `none`,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    paddingRight: 0,
    color: `#667085`,
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
    border: "none",
    ":focus": {
      boxShadow: "none",
      border: "none",
      outline: "none",
    },
    ":hover": {
      boxShadow: "none",
      border: "none",
      outline: "none",
    },
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


  control: (styles) => ({
    ...styles,
    width: `100%`,
    outline: "none",
    fontSize: 14,
    padding: 0,
    fontFamily: "var(--font-primary)",
    border: "none",
    boxShadow: "none",
    ":focus": {
      boxShadow: "none",
      border: "none",
      outline: "none",
    },
    ":hover": {
      boxShadow: "none",
      border: "none",
      outline: "none",
    },
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: `#FFF`,
    color: `#000 !important`,
  }),
  menuPortal: (styles) => ({
    ...styles,
    background: `red`,
    color: `#000 !important`,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: `transparent`,
    position: `relative`,
    padding: 7,
    cursor: "pointer",
    fontSize: 14,
    fontFamily: 'var(--font-primary)',
    color: `#000 !important`,
    ":active": {
      backgroundColor: `#F6D5D5`,
      color: `#000 !important`,
    },
    ":hover": {
      backgroundColor: `#F6D5D5 !important`,
    },
    ":focus": {
      backgroundColor: `#F6D5D5 !important`,
    },
    ":focus-visible": {
      backgroundColor: `#F6D5D5 !important`,
    },
    ":focus-within": {
      backgroundColor: `#F6D5D5 !important`,
    },
  }),

};

export const excludedOptions = ["Title"];
export const includedOptions = []; // ["Color", "Size", "Material", "Availability"];