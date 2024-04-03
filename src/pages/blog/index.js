import Container from "@/components/Shared/Container";
import {getAllBlogPosts} from "@/actions/Blog";
import {useEffect, useState} from "react";
import styles from "@/styles/BlogListing.module.scss";
import {formatDate} from "@/utlis/convert";
import Link from "next/link";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import Image from "next/image";

const BlogListingPage = () => {
  const [pageData, setPageData] = useState(null);
  const fetchPageData = async () => {
    const response = await getAllBlogPosts();
    setPageData(response);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Container>
        <Breadcrumb list={[{ href: "/", name: "Home" }, { name: "Blog" }]} />

        <div className={styles.heading}>
          <h1>From the Journal</h1>
          <p>
            Discover the latest news, events, and highlights in the world of
            jewellery.
          </p>
        </div>
        <div className={styles.blogList}>
          {pageData?.map((blog, index) => {
            const formattedDate = blog ? formatDate(blog.publishedAt) : "";

            return (
              <div className={styles.listItem} key={index}>
                <div className={styles.blogImage}>
                  <Link href={"/blog/" + blog?.handle}>
                    {" "}
                    <Image
                      src={blog?.image?.src}
                      alt={blog?.image?.altText}
                      height={300}
                      width={400}
                    />
                  </Link>
                </div>
                <div className={styles.blogContent}>
                  <h3>{blog?.name}</h3>
                  <p>{formattedDate}</p>
                  <Link href={"/blog/" + blog?.handle}>Read More</Link>
                </div>
              </div>
            );
          })}
        </div>

        <button>SEE MORE ARTICLES</button>
      </Container>
    </div>
  );
};
export default BlogListingPage;
