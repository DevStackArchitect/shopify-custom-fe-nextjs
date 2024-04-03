import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getBlogDetailsByHandle,} from "@/actions/Blog";
import Container from "@/components/Shared/Container";
import styles from "@/styles/BlogDetails.module.scss";
import {formatDate} from "@/utlis/convert";
import Breadcrumb from "@/components/Shared/Breadcrumb";

const BlogDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [pageData, setPageData] = useState(null);
  const fetchPageData = async () => {
    const response = await getBlogDetailsByHandle(slug);

    setPageData(response);
  };

  useEffect(() => {
    if (slug) {
      fetchPageData();
    }
  }, [slug, router.isReady]);
  if (!pageData) return <Container>Loading...</Container>;
  const formattedDate = pageData ? formatDate(pageData.publishedAt) : "";
  return (
    <>
      <Container>
        <div className={styles.topBanner}>
          <Breadcrumb
            list={[
              { href: "/", name: "Home" },
              { href: "/blog", name: "Blog" },
              { href: `/blog/${slug}`, name: pageData.title },
            ]}
          />
        </div>
      </Container>

      <div className={styles.wrapper}>
        <div className={styles.date}>{formattedDate}</div>
        <h1 className={styles.title}>{pageData.title}</h1>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: pageData.contentHtml }}
        />
      </div>
    </>
  );
};
export default BlogDetailPage;
