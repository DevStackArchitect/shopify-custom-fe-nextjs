import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getRecommendedProducts } from "@/actions/Recommends";
import { Context } from "@/actions/AppContext";

const Recommended = ({ vendor, close, limit = 3 }) => {
  const [pageData, setPageData] = useState(null);
  const { openOptionModal, userDetails } = useContext(Context);

  const fetchData = async () => {
    const data = await getRecommendedProducts(vendor);
    // Store only the first 4 products in pageData
    const firstFourProducts = data.products.slice(0, limit);
    setPageData(firstFourProducts);
  };

  useEffect(() => {
    if (vendor) {
      fetchData();
    }
  }, [vendor]);

  if (!pageData || pageData.length === 0) {
    return null;
  }

  const calculateDiscountPercentage = (minPrice, maxPrice) => {
    if (maxPrice <= minPrice) return 0;
    return Math.round(((maxPrice - minPrice) / maxPrice) * 100);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Goes great with</div>
      <div className={styles.list}>
        {pageData.map((product) => {
          const discountPercentage = product?.price
            ? calculateDiscountPercentage(
                parseFloat(product.price.minVariantPrice.amount),
                parseFloat(product.price.maxVariantPrice.amount),
              )
            : 0;

          return (
            <div key={product.id} className={styles.card}>
              <Link href={`/product/${product?.handle}`} onClick={close}>
                <div className={styles.imageContainer}>
                  {product?.images?.length > 0 && (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].altText || "Product Image"}
                      width={700}
                      height={700}
                      className={styles.productImage}
                    />
                  )}
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.title}>{product?.title}</div>
                  <div className={styles.options}>
                    {product?.vendor && (
                      <div className={styles.block}>
                        <label>Brand</label>
                        {product.vendor}
                      </div>
                    )}
                    {/* Display Size Options */}
                    {product.variantOptions?.Size && (
                      <div className={styles.block}>
                        <label>Size</label>
                        {product.variantOptions.Size.join(", ")}
                      </div>
                    )}
                  </div>
                  <div className={styles.amount}>
                    ₹{product?.price?.minVariantPrice?.amount}
                    {discountPercentage > 0 && (
                      <span className={styles.discountTag}>
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <div className={styles.mobileCart}>
                <button
                  className={styles.card}
                  onClick={() => openOptionModal(product.handle)}
                >
                  Add to Cart
                  <Image
                    src={"/images/ShoppingCartSimple.svg"}
                    alt={"cart"}
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommended;
