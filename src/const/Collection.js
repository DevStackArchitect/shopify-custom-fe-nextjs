
export const sortOptions = [
  { value: "Featured", label: "Featured" ,query: '' },
  { value: "Best selling", label: "Best selling" ,query: 'sortKey: BEST_SELLING' },
  { value: "Alphabetically, A-Z", label: "Alphabetically, A-Z" ,query: 'sortKey: TITLE, reverse: false'},
  { value: "Alphabetically, Z-A", label: "Alphabetically, Z-A",query: 'sortKey: TITLE, reverse: true' },
  { value: "Price, low to high", label: "Price: Low to High",query: 'sortKey: PRICE, reverse: false'  },
  { value: "Price, high to low", label: "Price: High to Low" ,query: 'sortKey: PRICE, reverse: true'},
  { value: "Date, old to new", label: "Date: Old to New" , query: 'sortKey: CREATED_AT, reverse: false' },
  { value: "Date, new to old", label: "Date: New to Old",query: 'sortKey: CREATED_AT, reverse: true' },
];
