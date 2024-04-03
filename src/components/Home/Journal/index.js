import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/Shared/Container";
import Slider from "react-slick";
import styles from "./styles.module.scss";
import { getRecentBlogPosts } from "@/actions/Blog";
import Link from "next/link";

const Journal = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      const posts = await getRecentBlogPosts();
      setBlogPosts(posts);
    }

    fetchBlogPosts();
  }, []);

  const settings = {
    // Slider settings
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    arrows: false,
    adaptiveHeight: true
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <h4><Link href={'/blog'}>From the Journal</Link></h4>

        <div className={styles.list}>
          {blogPosts.map((item, key) => {
            return (
                <Link
                    href={`/blog/${item.handle}`}
                    className={styles.card}
                    key={key}
                >
                  <Image
                      src={item.image.src}
                      alt={item.image.altText}
                      width={500}
                      height={500}
                  />
                  <p>{item.name}</p>
                </Link>
            );
          })}
        </div>

        <div className={styles.sliderBlock}>
          <Slider {...settings}>
            {blogPosts.map((item, key) => {
              return (
                <Link href={`/blog/${item.handle}`} key={key}>
                  <div className={styles.card}>
                    <Image
                      src={item.image.src}
                      alt={item.image.altText}
                      width={500}
                      height={500}
                    />
                    <p>{item.name}</p>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default Journal;
