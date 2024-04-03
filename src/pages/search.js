import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { searchRelatedProducts } from "@/actions/Platform";
import ProductCard from "@/components/Shared/ProductCard";
import styles from "@/styles/Search.module.scss";
import Container from "@/components/Shared/Container";
import CollectionFilters from "@/components/Collection/Filters";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(null);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      searchRelatedProducts(query, selectedFilters)
        .then((results) => {
          setSearchResults(results);
          setIsLoading(false);
          if (filterOptions === null) {
            setFilterOptions(results);
          }
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setIsLoading(false);
        });
    }
  }, [query, selectedFilters]);

  return (
    <Container>
      <div>
        {filterOptions && (
          <CollectionFilters
            data={filterOptions}
            onFiltersChange={setSelectedFilters}
          />
        )}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.productList}>
            {searchResults?.results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;
