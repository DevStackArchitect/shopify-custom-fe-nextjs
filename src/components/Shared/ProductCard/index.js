import styles from "./styles.module.scss";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import { Context } from "@/actions/AppContext";
import useWhishlistActions from "@/utlis/useWhishlistActions";
import Rating from "@/components/Shared/Rating";
import StarRating from "@/components/Shared/Rating";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const ProductCard = ({ product, isRecomanded }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const { toggleProductWishlist, isProductInWishlist } = useWhishlistActions();
  const { openOptionModal, userDetails } = useContext(Context);

  // Function to calculate discount percentage
  const calculateDiscountPercentage = (minPrice, maxPrice) => {
    if (maxPrice <= minPrice) return 0; // No discount if max price is less than or equal to min price
    return Math.round(((maxPrice - minPrice) / maxPrice) * 100);
  };

  const discountPercentage = product?.price
    ? calculateDiscountPercentage(
        parseFloat(product.price.minVariantPrice.amount),
        parseFloat(product.price.maxVariantPrice.amount),
      )
    : 0;

  useEffect(() => {
    setIsLiked(isProductInWishlist(product.handle));
  }, [isLiked]);
  return (
    <>
      <div className={styles.wrapper}>
        {isRecomanded && <div className={styles.recomanded}>Recommended</div>}
        <div className={styles.imageContainer}>
          <div className={styles.actionButton}>
            <div></div>
            <div
              className={styles.like}
              onClick={() => {
                toggleProductWishlist(product.handle);
                setIsLiked(!isLiked);
              }}
            >
              {isLiked ? (
                <Image
                  src={"/images/filled-heart.svg"}
                  alt={"heart"}
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={"/images/outlined-heart.svg"}
                  alt={"heart"}
                  width={24}
                  height={24}
                />
              )}
            </div>

            <div
              className={styles.addToCard}
              onClick={() => openOptionModal(product.handle)}
            >
              <Image
                src={"/images/cart-plus.svg"}
                alt={"cart"}
                width={20}
                height={20}
              />
            </div>
          </div>
          <Link href={`/product/${product?.handle}`}>
            <Image
              src={
                product?.images && product.images.length > 0
                  ? product?.images[0].src
                  : "/images/product.png"
              }
              alt={""}
              width={700}
              height={700}
              className={styles.productImg}
            />
          </Link>
          <div className={styles.sliderContainer}>
            <Slider {...settings}>
              {product.images.map((image, index) => {
                return (
                  <Link href={`/product/${product?.handle}`} key={index}>
                    <div className={styles.psContainer}>
                      <img
                        src={image.src}
                        alt={""}
                        width={700}
                        height={700}
                      />
                    </div>
                  </Link>
                );
              })}
            </Slider>
          </div>
        </div>
        <Link href={`/product/${product?.handle}`}>
          <div className={styles.desc}>
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

            <div className={styles.bottom}>
              <div className={styles.amount}>
                ₹{product?.price?.minVariantPrice?.amount}
              </div>
              {discountPercentage > 0 && (
                <div className={styles.discountTag}>
                  {discountPercentage}% OFF
                </div>
              )}
              <div className={styles.rating}>
                {product.rating > 0 && <StarRating rating={product.rating} />}

                {product?.ratingCount > 0 && ` (${product.ratingCount})`}

              </div>
            </div>
          </div>
          {product.stock && (
            <div className={styles.stock}>Only 3 left in stock</div>
          )}
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
          {product.customize && (
            <div className={styles.customisable}>Customisable</div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductCard;
