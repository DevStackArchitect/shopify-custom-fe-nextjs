import styles from "./styles.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const ImageShowcase = ({ data }) => {
  const [listHeight, setListHeight] = useState(0);
  const [activeImageUrl, setActiveImageUrl] = useState(data && data[0]?.src); // Default image
  const bigImageRef = useRef(null);

  useEffect(() => {
    if (bigImageRef.current) {
      setListHeight(bigImageRef.current.offsetHeight);
    }
  }, [bigImageRef.current]);

  const handleImageClick = (imageUrl) => {
    setActiveImageUrl(imageUrl);
  };

  return (
    <div className={styles.imageShowcaseRow}>
      <div className={styles.bigImage} ref={bigImageRef}>
        <Image
          src={activeImageUrl}
          alt={"product image"}
          width={500}
          height={500}
        />
      </div>
      <ul className={styles.imgList} style={{ height: `${listHeight}px` }}>
        {data.map((item, key) => {
          const imageUrl = item.src; // Replace with actual image URL
          return (
            <li key={key} onClick={() => handleImageClick(imageUrl)}>
              <Image
                src={imageUrl}
                alt={"product image"}
                width={92}
                height={92}
              />
            </li>
          );
        })}
      </ul>

      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {data.map((item, key) => {
            const imageUrl = item.src; // Replace with actual image URL
            return (
              <div className={styles.listItem} key={key} onClick={() => handleImageClick(imageUrl)}>
                <Image
                  src={imageUrl}
                  alt={"product image"}
                  width={92}
                  height={92}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ImageShowcase;
