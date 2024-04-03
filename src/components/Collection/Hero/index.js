import styles from "./styles.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMenuByHandle } from "@/actions/Menu";
import { findData } from "@/utlis/Home";
import { getSingleCollectionData } from "@/actions/Collection";
import Link from "next/link";
const CollectionHero = ({ data, onClickMainCat, active }) => {
  const [pageData, setPageData] = useState([]);

  const fetchDetails = async () => {
    try {
      const responses = await Promise.all(
        data.map((item) => getSingleCollectionData(item.handle)),
      );
      setPageData(responses);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.listing}>
        {pageData.map((item, key) => {
          if (!item.title) return null;
          return (
            <div
              className={`${styles.item}  ${
                active === item.handle && styles.active
              }`}
              key={key}
              onClick={() => onClickMainCat(item.handle)}
            >
              <Image
                src={item?.imageSrc}
                alt={item?.imageAltText}
                width={700}
                height={700}
              />
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CollectionHero;
