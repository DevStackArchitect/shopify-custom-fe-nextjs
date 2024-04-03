import styles from "./styles.module.scss";
import Divider from "@/components/Shared/Divider";
import { useContext, useEffect, useState } from "react";
import { getProductDetailsByHandle } from "@/actions/Product";
import { toast } from "react-hot-toast";
import { useCartActions } from "@/utlis/useCartActions";
import { Context } from "@/actions/AppContext";
import Image from "next/image";

const OptionSelectModal = ({ handle }) => {
  const { closeOptionModal, cart } = useContext(Context);
  const { addToCart, buyNow } = useCartActions();
  const [pageData, setPageData] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if (handle) {
      fetchDetails();
    }
  }, [handle]);

  const fetchDetails = async () => {
    try {
      const response = await getProductDetailsByHandle(handle);
      if (response) {
        setPageData(response);
      } else {
        toast.error("Product details not found.");
      }
    } catch (error) {
      toast.error("Error fetching product details.");
    }
  };

  const isOptionAvailable = (optionName, optionValue) => {
    return pageData?.variants.some(
      (variant) =>
        variant.availableForSale &&
        variant.selectedOptions.some(
          (option) =>
            option.name === optionName && option.value === optionValue,
        ),
    );
  };

  const handleOptionSelection = (optionName, optionValue) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue,
    };
    setSelectedOptions(newSelectedOptions);

    const matchingVariant = pageData?.variants.find((variant) =>
      Object.entries(newSelectedOptions).every(([name, value]) =>
        variant.selectedOptions.some(
          (option) => option.name === name && option.value === value,
        ),
      ),
    );
    setSelectedVariantId(matchingVariant?.id || null);
  };

  const handleAddToCart = async () => {
    if (!selectedVariantId) {
      toast.error("Please select a variant");
      return;
    }

    try {
      const response = await addToCart(selectedVariantId, 1);
      toast.success("Added to cart");
      closeOptionModal();
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (!pageData) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.underLay} onClick={() => closeOptionModal()}></div>
      <div className={styles.wrapper} style={cart.items && { bottom: 80 }}>
        <div className={styles.headingContainer}>
          <h4>{pageData?.name}</h4>
          <p>Customize as per your interest</p>
          <Image
            src={"/images/close.svg"}
            alt={"close"}
            width={20}
            height={20}
            className={styles.closeIcon}
            onClick={() => closeOptionModal()}
          />
        </div>
        <Divider />
        <div className={styles.optionContainer}>
          {pageData.options.map((option) => (
            <div key={option.id} className={styles.optionBlock}>
              <h4>{option.name}</h4>
              <div className={styles.optionList}>
                {option.values.map((value) => (
                  <button
                    key={value}
                    className={`${styles.option} ${
                      selectedOptions[option.name] === value
                        ? styles.active
                        : ""
                    } ${
                      isOptionAvailable(option.name, value)
                        ? ""
                        : styles.disabled
                    }`}
                    onClick={() => handleOptionSelection(option.name, value)}
                    disabled={!isOptionAvailable(option.name, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default OptionSelectModal;
