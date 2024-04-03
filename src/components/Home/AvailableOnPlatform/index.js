import styles from "./styles.module.scss";
import Container from "@/components/Shared/Container";
import React from "react";
import Link from "next/link";
import CollectionCard from "@/components/Home/CollectionCard";

const AvailableOnPlatform = ({
  data,
  heading,
  subheading,
  link,
  headingLinkText,
  removeFromTitle,
}) => {
  const excludedCollections = [
    "geometry-box-sets",
    "office-essentials",
    "permanent-markers",
  ];
  return (
    <div className={styles.wrapper}>
      <Container>
        <h3>
          <div dangerouslySetInnerHTML={{ __html: heading }}></div>
          {headingLinkText && link && (
            <Link href={link}>{headingLinkText}</Link>
          )}
        </h3>
        <p>{subheading}</p>

        <div className={styles.sliderContainer}>
          {data.map((product, key) => {
            if (excludedCollections.includes(product.handle)) return null;
            return (
              <CollectionCard
                link={link ? link : false}
                key={key}
                collectionId={product.handle}
                removeFromTitle={removeFromTitle}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};
export default AvailableOnPlatform;
