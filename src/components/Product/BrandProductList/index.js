import styles from "./styles.module.scss";
import Container from "@/components/Shared/Container";
import React, { useEffect, useState } from "react";
import CollectionCard from "@/components/Home/CollectionCard";
import ProductCard from "@/components/Shared/ProductCard";
import { formatCollectionData, getCollectionData } from "@/actions/Collection";

const BrandProductList = ({ brand, heading, subheading }) => {
  const [pageData, setPageData] = useState("loading");

  const getData = async () => {
    try {
        if(!brand) return;
      const collectoinResposne = await getCollectionData(brand);
      const formattedoutput = formatCollectionData(collectoinResposne);
      setPageData(formattedoutput.products.slice(0, 4));
    } catch (error) {
      console.error(error);
      setPageData([]);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (pageData === "loading") return <div>Loading...</div>;
  if (!pageData || pageData.length <= 0) return null;
  return (
    <div className={styles.wrapper}>
      <Container>
        <h3 dangerouslySetInnerHTML={{ __html: heading }}></h3>
        <p>{subheading}</p>

        <div className={styles.sliderContainer}>
          {pageData &&
              pageData?.map((product, key) => {
              return <ProductCard key={key} product={product} />;
            })}
        </div>
      </Container>
    </div>
  );
};
export default BrandProductList;
