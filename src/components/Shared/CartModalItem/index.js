import Image from "next/image";
import styles from "@/components/Shared/CartModal/styles.module.scss";
import { useState } from "react";
import {useCartActions} from "@/utlis/useCartActions";

const CartModalItem = ({ data }) => {
  const { buyNow, addToCart } = useCartActions();

  // Check for the presence of data before rendering the component
  if (!data) return null;

  // Calculate discount percentage
  const discountPercentage =
    data.compareAtPrice > data.price
      ? (
          ((data.compareAtPrice - data.price) / data.compareAtPrice) *
          100
        ).toFixed(0)
      : 0;

  return (
    <div className={styles.cartItemWrapper}>
      <Image
        src={data.imageUrl || "/images/placeholder.png"} // Fallback to a placeholder image if imageUrl is not available
        alt={data.productTitle}
        width={200}
        height={200}
        className={styles.productImage}
      />
      <div className={styles.desc}>
        <h4>{data.productTitle}</h4>

        <div className={styles.variantOptions}>
          {data?.variantOptions?.map((option) => (
            <div key={option.name} className={styles.variantList}>
              <div className={styles.name}>{option.name}: </div>
              <div className={styles.value}>{option.value}</div>
            </div>
          ))}
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.quantityBox}>
            <div
              className={styles.quantityButton}
              onClick={() => addToCart(data.variantId, data.quantity - 1)}
            >
              <Image
                src={"/images/minus.svg"}
                alt={"Decrease quantity"}
                width={20}
                height={20}
              />
            </div>
            <div className={styles.quantityValue}>{data.quantity}</div>
            <div
              className={styles.quantityButtonPlus}
              onClick={() => addToCart(data.variantId, data.quantity + 1)}
            >
              <Image
                src={"/images/plus.svg"}
                alt={"Increase quantity"}
                width={20}
                height={20}
              />
            </div>
          </div>
          <div>
            <div className={styles.minPrice}>₹{data.price.toFixed(2)}</div>
            {discountPercentage > 0 && (
              <div className={styles.priceBelow}>
                <div className={styles.maxPrice}>
                  ₹{data.compareAtPrice.toFixed(2)}
                </div>
                <div className={styles.tag}>{discountPercentage}% OFF</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModalItem;
