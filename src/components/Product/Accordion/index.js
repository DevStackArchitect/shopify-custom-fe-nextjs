import React, { useState } from "react";
import styles from "./styles.module.scss";
import Divider from "@/components/Shared/Divider";
import Image from "next/image";

const ProductAccordion = ({ description }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h5 onClick={() => toggleSection(1)}>
          <span>Product Description</span>
          <Image src={"/images/plus.svg"} alt={"plus"} width={24} height={24} />
        </h5>
        <div
          className={`${styles.details} ${
            openSection === 1 ? styles.open : ""
          }`}
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
      <Divider />
      <div className={styles.content}>
        <h5 onClick={() => toggleSection(2)}>
          <span>Additional Information</span>
          <Image src={"/images/plus.svg"} alt={"plus"} width={24} height={24} />
        </h5>
        <div
          className={`${styles.details} ${
            openSection === 2 ? styles.open : ""
          }`}
        >
         // Add your additional information here
        </div>
      </div>
    </div>
  );
};

export default ProductAccordion;
