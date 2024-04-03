import Image from "next/image";
import styles from "./styles.module.scss";
import {useRouter} from "next/router";
import {useState} from "react";

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            // Navigate to the search page with the query parameter
            router.push({
                pathname: '/search',
                query: { query: searchTerm },
            });
        }
    };
  return (
    <div className={styles.searchContainer}>
      <Image src={"/images/search.svg"} alt={"search"} width={24} height={24} />
      <input
        type="text"
        placeholder={"Search"}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};
export default SearchInput;
