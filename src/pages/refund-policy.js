import React from "react";
import styles from "@/styles/RefundPolicy.module.scss";
import Container from "@/components/Shared/Container";
import Image from "next/image";
import WhiteCard from "@/components/Shared/WhiteCard";

const RefundPolicy = () => {
  return (
      <div className={styles.wrapper}>
        <Container>
          <h1>Refund Policy Overview</h1>
          <Image
              src={"https://placehold.co/400"}
              alt={"Refund Policy"}
              width={400}
              height={400}
              className={styles.heroImage}
          />
          <WhiteCard>
            <p>
              Our goal is to ensure your complete satisfaction with your purchase. If, for any reason, you are not satisfied, please return it to us within 14 days of the date of purchase for a replacement or refund.
              <br /><br />
              To initiate a return, please contact our customer service team with your order number and reason for return. Ensure the product is in its original condition and packaging.
              <br /><br />
              Returns may be subject to a restocking fee. Products returned used or damaged may not qualify for a full refund. For assistance, reach out to <a href="mailto:fakeemail@domain.com">fakeemail@domain.com</a>.
            </p>
          </WhiteCard>
          <div className={styles.gridList}>
            <div className={styles.cardContent}>
              <h2>Return Process</h2>
              <ul>
                <li>Initiate your return within 14 days of purchase.</li>
                <li>Ensure the item is in its original packaging and condition.</li>
                <li>Contact our customer service for a return authorization.</li>
              </ul>
            </div>
            <div className={styles.cardContent}>
              <h2>Conditions for Return</h2>
              <p>
                Items must be in new and unused condition. Customized items and perishable goods are non-returnable. Please review our full list of non-returnable items on our website.
              </p>
            </div>
            <div className={styles.cardContent}>
              <h2>Non-Returnable Items</h2>
              <ul>
                <li>Customized products and personalized items.</li>
                <li>Downloadable software products.</li>
                <li>Some health and personal care items.</li>
              </ul>
            </div>
            <div className={styles.cardContent}>
              <h2>Refund Timeline</h2>
              <p>
                If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.
              </p>
            </div>
          </div>
        </Container>
      </div>
  );
};

export default RefundPolicy;
