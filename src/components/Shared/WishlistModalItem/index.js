import Image from "next/image";
import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import { useCartActions } from "@/utlis/useCartActions";
import { Context } from "@/actions/AppContext";
import useWishlist from "@/utlis/useWhishlistActions";

const WishlistModalItem = ({ data ,updateList}) => {
  const { openOptionModal, userDetails } = useContext(Context);
  const { toggleProductWishlist } = useWishlist();

  // Check if data exists before rendering the component
  if (!data) {
    return null;
  }

  // Calculate discount percentage
  const originalPrice = parseFloat(data.minPrice.replace("INR", "").trim());
  const discountedPrice = parseFloat(data.maxPrice.replace("INR", "").trim());

  const discountPercentage = Math.floor(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );

  return (
    <div className={styles.cartItemWrapper}>
      <Image
        src={data?.images[0]?.src || "/images/placeholder.png"} // Fallback to a placeholder image if imageUrl is not available
        alt={data?.images[0]?.altText}
        width={200}
        height={200}
        className={styles.productImage}
      />
      <div className={styles.desc}>
        <h4>
          {data.title}

          <Image
            src={"/images/filled-heart.svg"}
            alt={"heart"}
            width={24}
            height={24}
            onClick={() => {
              toggleProductWishlist(data.handle);
              updateList();
            }}
          />
        </h4>

        <div className={styles.variantOptions}>
          {data?.options?.map((option) => (
            <div key={option.id} className={styles.variantList}>
              <div className={styles.name}>{option.name}: </div>
              <div className={styles.value}>{option.values?.join(", ")}</div>
            </div>
          ))}
        </div>
        <div className={styles.priceContainer}>
          <div>
            <div className={styles.minPrice}>{data?.minPrice}</div>
            {discountPercentage > 0 && (
              <div className={styles.priceBelow}>
                <div className={styles.maxPrice}>₹{data.maxPrice}</div>
                <div className={styles.tag}>{discountPercentage}% OFF</div>
              </div>
            )}
          </div>
          <button
            className={styles.addToCart}
            onClick={() => openOptionModal(data.handle)}
          >
            Add to cart
            <Image
              src={"/images/ShoppingCartSimple.svg"}
              alt={"cart"}
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistModalItem;
