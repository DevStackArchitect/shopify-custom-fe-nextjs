import styles from "./styles.module.scss";
import Container from "@/components/Shared/Container";
import ProductCard from "@/components/Shared/ProductCard";
import { useEffect, useState } from "react";
import { getRecentlyViewedProducts } from "@/actions/RecentViewed";
import { formatCollectionData, getCollectionData } from "@/actions/Collection";
const RecentViewed = () => {
  const [pageData, setPageData] = useState("loading");
  const getData = async () => {
    const response = await getRecentlyViewedProducts();

    if (response.length > 0) {
      setPageData(response);
    } else {
      const collectoinResposne = await getCollectionData("best-sellers");
      const formattedoutput = formatCollectionData(collectoinResposne);
      setPageData(formattedoutput.products.slice(0, 4));
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
        <h5>Recent Viewed</h5>
        <div className={styles.list}>
          {pageData.map((items, i) => {
            return <ProductCard product={items} key={i} />;
          })}
        </div>
      </Container>
    </div>
  );
};
export default RecentViewed;
