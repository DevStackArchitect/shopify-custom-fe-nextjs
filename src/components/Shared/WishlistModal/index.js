import styles from "./styles.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/components/Shared/ProductCard";
import CartModalItem from "@/components/Shared/CartModalItem";
import { getProductDetailsByHandle } from "@/actions/Product";
import WishlistModalItem from "@/components/Shared/WishlistModalItem";
import Divider from "@/components/Shared/Divider";

const WishlistModal = ({ open, close, relative }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  const fetchData = async () => {
    // Fetch wishlist items here and store them in wishlistItems state
    const wishlistItemsFromLocalStorage = localStorage.getItem("wishlist");
    if (wishlistItemsFromLocalStorage) {
      const parsedWishlistItems = JSON.parse(wishlistItemsFromLocalStorage);
      setWishlistItems(parsedWishlistItems);
    } else {
      setWishlistItems([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, [open]);

  useEffect(() => {
    // Fetch product details for each item in the wishlist
    if (wishlistItems.length === 0) {
      setProductDetails([]);
      return;
    }
    const fetchProductDetailsForWishlistItems = async () => {
      const productPromises = wishlistItems.map((productId) => {
        return getProductDetailsByHandle(productId); // Assuming productId is a handle or unique identifier
      });

      try {
        const productDetails = await Promise.all(productPromises);
        setProductDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (wishlistItems.length > 0) {
      fetchProductDetailsForWishlistItems();
    }
  }, [wishlistItems]);
  if (!open) return null;
  return (
    <>
      {!relative && (
        <div className={styles.underLay} onClick={() => close()}></div>
      )}
      <div className={`${styles.wrapper} ${relative && styles.pagePositions}`}>
        {!relative && (
          <div className={styles.header}>
            <h5>Wishlist</h5>
            <Image
              src={"/images/close.svg"}
              alt={"close"}
              width={24}
              height={24}
              className={styles.close}
              onClick={() => close()}
            />
          </div>
        )}

        <div className={styles.cartItem}>
          {productDetails.length >= 1 ? (
            <ul>
              {productDetails.map((product, index) => (
                <>
                  {index != 0 && <Divider />}
                  <li key={product.id}>
                    <WishlistModalItem
                      data={product}
                      updateList={() => fetchData()}
                    />
                  </li>
                </>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyCart}>
              <h5>Your wishlist is empty</h5>
              <p>Explore more shortlist some items.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistModal;
