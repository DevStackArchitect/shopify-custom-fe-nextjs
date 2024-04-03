import styles from "./styles.module.scss";
import Container from "@/components/Shared/Container";
import React from "react";
import Row from "@/components/Shared/Row";
const TopBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Row>
          <div className={styles.headings}>
            <div className={styles.title}>Savings Made Smarter</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
            >
              <circle cx="4" cy="4" r="4" fill="#54457F" />
            </svg>
            <div className={styles.subTitle}>Gst billing now available</div>
          </div>
          <div className={styles.track}>
            <img src="/images/truck.svg" alt=""/>
            Track your order
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default TopBanner;
