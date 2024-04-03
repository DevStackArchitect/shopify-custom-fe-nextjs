import styles from "./styles.module.scss";
import Container from "@/components/Shared/Container";
import ProductCard from "@/components/Shared/ProductCard";
import {useEffect, useState} from "react";
import {formatCollectionData, getCollectionData} from "@/actions/Collection";
import {getRecommendedProducts} from "@/actions/Recommends";

const YouMightAlsoLike = ({ productId }) => {
  const [pageData, setPageData] = useState("loading");
  const getData = async () => {
    const response = await getRecommendedProducts(productId);
    if (response?.products.length > 0) {

      setPageData(response.products.slice(0, 4));
    } else {
      const collectoinResposne = await getCollectionData("best-sellers");
      const formattedoutput = formatCollectionData(collectoinResposne);
      setPageData(formattedoutput.products.slice(0, 4));
    }
  };
  useEffect(() => {
    if (productId) {
      getData();
    }
  }, [productId]);

  if (pageData === "loading") return <div>Loading...</div>;

  if (!pageData || pageData.length <= 0) return null;
  return (
    <div className={styles.wrapper}>
      <Container>
        <h5>You might also like</h5>
        <div className={styles.list}>
          {pageData.map((items, i) => {
            return <ProductCard product={items} key={i} />;
          })}
        </div>
      </Container>
    </div>
  );
};
export default YouMightAlsoLike;
