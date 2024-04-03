import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const DesktopSearch = () => {
  const [inputActive, setInputActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    setInputActive(searchTerm.length > 0);
  }, [searchTerm]);
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // Navigate to the search page with the query parameter
      router.push({
        pathname: "/search",
        query: { query: searchTerm },
      });
    }
  };
  return (
    <div className={`${styles.wrapper}  ${inputActive && styles.active}`}>
      <Image
        src={"/images/search.svg"}
        alt={"search"}
        width={24}
        height={24}
        className={styles.search}
        onClick={() => setInputActive(!inputActive)}
      />
      <input
        type="text"
        placeholder="Search"
        className={inputActive ? styles.active : ""}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(searchTerm.length > 0)}
      />
    </div>
  );
};

export default DesktopSearch;
