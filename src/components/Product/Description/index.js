import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Container from "@/components/Shared/Container";
import ImageShowcase from "@/components/Product/ImageShowcase";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import Divider from "@/components/Shared/Divider";
import ProductAccordion from "@/components/Product/Accordion";
import Link from "next/link";
import { createCart, getCheckoutUrl } from "@/actions/Cart";
import { Context } from "@/actions/AppContext";
import { useContext, useState } from "react";
import { useCartActions } from "@/utlis/useCartActions";
import { toast } from "react-hot-toast";
import { log } from "next/dist/server/typescript/utils";
const ProductDescription = ({ data }) => {
  const router = useRouter();
  const { buyNow, addToCart } = useCartActions();
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const isOptionAvailable = (optionName, optionValue) => {
    return data.variants.some(
      (variant) =>
        variant.availableForSale &&
        variant.selectedOptions.some(
          (option) =>
            option.name === optionName && option.value === optionValue,
        ),
    );
  };
  const calculateDiscountPercentage = (minPrice, maxPrice) => {
    if (maxPrice <= minPrice) return 0; // No discount if max price is less than or equal to min price
    return Math.round(((maxPrice - minPrice) / maxPrice) * 100);
  };

  const discountPercentage = data?.price
    ? calculateDiscountPercentage(
        parseFloat(data.minPrice),
        parseFloat(data.maxPrice),
      )
    : 0;

  const renderAvailableText = (optionName) => {
    if (data.availability > 4) {
      return "Product In Stock";
    } else if (data.availability > 0) {
      return "Only " + data.availability + " Left";
    } else {
      return "Out of Stock";
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariantId) {
      toast.error("Please select a variant");
      return;
    }

    await addToCart(selectedVariantId, quantity);
    // Additional UI feedback
  };
  const handleBuyNow = async () => {
    if (!selectedVariantId) {
      toast.error("Please select a variant");
      return;
    }

    await buyNow(selectedVariantId, quantity);
  };

  const isVariantAvailable = (selectedOptions) => {
    return data.variants.some(
      (variant) =>
        variant.availableForSale &&
        Object.entries(selectedOptions).every(([name, value]) =>
          variant.selectedOptions.some(
            (option) => option.name === name && option.value === value,
          ),
        ),
    );
  };

  const handleOptionSelection = (optionName, optionValue) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue,
    };
    setSelectedOptions(newSelectedOptions);

    if (isVariantAvailable(newSelectedOptions)) {
      // Find and set the corresponding variant ID
      const matchingVariant = data.variants.find((variant) =>
        variant.selectedOptions.every(
          (option) => newSelectedOptions[option.name] === option.value,
        ),
      );
      setSelectedVariantId(matchingVariant?.id);
    }
  };
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.goBack} onClick={() => router.back()}>
          <Image
            src={"/images/ArrowLeft.svg"}
            alt={`arrow left`}
            width={20}
            height={20}
          />
        </div>
        <div className={styles.mobileDetails}>

          <div className={styles.name}>{data?.title}</div>
          <Link href={`/collection/${data.vendor}`}>
            <div className={styles.brand}>{data?.vendor?.toLowerCase()}</div>
          </Link>
          <div className={styles.amount}>
            <span className={styles.minPrice}>₹ {data?.minPrice}</span>
            {data?.minPrice !== data?.maxPrice && (
              <span className={styles.maxPrice}>₹ {data?.maxPrice}</span>
            )}
            {discountPercentage !== 0 && (
              <span className={styles.discount}>{discountPercentage}% OFF</span>
            )}
          </div>
          <div className={styles.stock}>{renderAvailableText}</div>
          <Divider />
        </div>
        <div className={styles.detailContainer}>
          {data?.images && data?.images.length > 0 && (
            <ImageShowcase data={data.images} />
          )}
          <div className={styles.detailBlock}>
            <div className={styles.hideOnMobile}>
              <Breadcrumb
                list={[
                  { href: "/", name: "Home" },
                  { href: `/products/`, name: "Products" },
                ]}
              />
              <div className={styles.name}>{data?.title}</div>
              <Link href={`/collection/${data.vendor}`}>
                <div className={styles.brand}>
                  {(data?.vendor).toLowerCase()}
                </div>
              </Link>
              <div className={styles.amount}>
                <span className={styles.minPrice}>₹ {data?.minPrice}</span>
                {data?.minPrice !== data?.maxPrice && (
                  <span className={styles.maxPrice}>₹ {data?.maxPrice}</span>
                )}
                {discountPercentage>0&& <span className={styles.discount}>{discountPercentage}% OFF</span>}
              </div>
              <div className={styles.stock}>{renderAvailableText}</div>
              <Divider addedStyles={styles.divider} />
            </div>
            <div className={styles.options}>
              {/* Variant Options */}
              {data.options.map((option) => (
                <div key={option.id} className={styles.cat}>
                  <h4>{option.name}</h4>
                  <ul>
                    {option.values.map((value) => (
                      <li
                        key={value}
                        className={`${styles.option} ${
                          selectedOptions[option.name] === value
                            ? styles.active
                            : ""
                        }
                        ${
                          isOptionAvailable(option.name, value)
                            ? ""
                            : styles.disabled
                        }
                        `}
                        onClick={() =>
                          handleOptionSelection(option.name, value)
                        }
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.quantity}>
              <label>Select quantity</label>
              <div className={styles.quantityBox}>
                <div
                  className={styles.quantityButton}
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <Image
                    src={"/images/minus.svg"}
                    alt={""}
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.quantityValue}>{quantity}</div>
                <div
                  className={styles.quantityButtonPlus}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Image
                    src={"/images/plus.svg"}
                    alt={""}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            <div className={styles.ctaContainer}>
              <div className={styles.addToCart} onClick={handleAddToCart}>
                Add to Cart
                <Image
                  src={"/images/ShoppingCartSimple.svg"}
                  alt={">"}
                  width={24}
                  height={24}
                />
              </div>
              <div className={styles.buy} onClick={handleBuyNow}>
                Buy Now
                <Image
                  src={"/images/ShoppingBag.svg"}
                  alt={">"}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <ProductAccordion description={data.descriptionHtml} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDescription;
