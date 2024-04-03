import styles from "./styles.module.scss";
import ProductCard from "@/components/Shared/ProductCard";

const ProductList = ({ products, recomanded }) => {
  return (
    <div className={styles.wrapper}>
      {/*<div className={styles.count}>*/}
      {/*  Showing <span>172 Products</span>*/}
      {/*</div>*/}
      <div className={styles.gridList}>
        {products.map((product, key) => {
          const isRecomanded = recomanded?.includes(product.id);
          return (
            <ProductCard
              product={product}
              isRecomanded={isRecomanded}
              key={key}
            />
          );
        })}
      </div>
      {/*<button className={styles.loadMore}>LOAD MORE</button>*/}
    </div>
  );
};
export default ProductList;
