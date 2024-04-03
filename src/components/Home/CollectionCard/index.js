import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { getSingleCollectionData } from "@/actions/Collection";
import Link from "next/link";
import Image from "next/image";
import {removePhraseFromTitle} from "@/utlis/convert";
const HomeCollectionCard = ({
  collectionId,
  link,
  removeFromTitle = false,
}) => {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    const response = await getSingleCollectionData(collectionId);
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (!data || data.length <= 0 || !data.title) return null;
  const currentlink = link ? `${link}?selected_cat=${data.handle}` : `/collection/${data.handle}`;
  return (
    <div className={styles.slideItem}>
      <Link href={currentlink}>
        <div className={styles.card}>
          {removeFromTitle ? (
            <div className={styles.title}>
              {removePhraseFromTitle(data.title, removeFromTitle)}
            </div>
          ) : (
            <div className={styles.title}>{data.title}</div>
          )}
          <Image
            src={
              data?.imageSrc ? data.imageSrc : "https://picsum.photos/400/400"
            }
            alt={data?.imageAltText}
            width={300}
            height={400}
          />
          <div className={styles.caption}>
            <span className={styles.text}>Shop Now</span>
            {data?.productsCount && (
              <span>({data?.productsCount}<span className={styles.mobile}>&nbsp;products</span>)</span>
            )}

          </div>
        </div>
      </Link>
    </div>
  );
};
export default HomeCollectionCard;
