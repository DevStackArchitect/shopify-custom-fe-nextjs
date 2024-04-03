import Container from "@/components/Shared/Container";
import CollectionHero from "@/components/Collection/Hero";
import ProductList from "@/components/Collection/ProductList";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatCollectionData, getCollectionData } from "@/actions/Collection";
import styles from "@/styles/ProductCollection.module.scss";
import { getMenuByHandle } from "@/actions/Menu";
import { findData } from "@/utlis/Home";
import Image from "next/image";
import CollectionFilters from "@/components/Collection/Filters";
import { getRecommendedCollectionProductIds } from "@/actions/Product";
import YouMightAlsoLike from "@/components/YouMightAlsoLike";
import { isMobile } from "react-device-detect";
import HeroBanner from "@/components/Collection/HeroBanner";
import CollectionExplore from "@/components/Collection/Explore";
import Divider from "@/components/Shared/Divider";

const CollectionPage = ({ collection }) => {
  const router = useRouter();
  const [pageData, setPageData] = useState("loading");
  const [pageTitle, setPageTitle] = useState("");

  const [currentHandle, setCurrentHandle] = useState([]);
  const [recommandedCollection, setRecommandedCollection] = useState();
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const { slug, selected_cat } = router.query;
  const fetchData = async () => {
    const response = await getCollectionData(currentHandle, selectedFilters);

    const formattedoutput = formatCollectionData(response);
    setPageData(formattedoutput);
    console.log("formattedoutput", formattedoutput);
    if (filterOptions === null) {
      setFilterOptions(formattedoutput);
    }
  };

  useEffect(() => {
    if (currentHandle) {
      setPageData("loading");
      fetchData();
    }
  }, [currentHandle, selectedFilters]);

  useEffect(() => {
    if (slug) {
      if (!selected_cat) {
        setCurrentHandle(slug);
      }
      getRecommeded();
    }
  }, [router.isReady, router.query]);

  const getRecommeded = async () => {
    const response = await getRecommendedCollectionProductIds();
    setRecommandedCollection(response);
  };

  return (
    <>
      <HeroBanner data={pageData} />
      <Container>
        <h1 className={styles.collectionTitle}>{pageData?.title}</h1>

        {pageData?.brandList && pageData.brandList.length > 1 && (
          <>
            <CollectionExplore data={pageData.brandList} />
            <Divider />
          </>
        )}

        {pageData && pageData && (
          <CollectionFilters
            data={filterOptions}
            onFiltersChange={setSelectedFilters}
          />
        )}
      </Container>


        {pageData?.products && (
          <ProductList
            recomanded={recommandedCollection}
            products={pageData.products}
          />
        )}
      {pageData?.products && pageData?.products.length > 0 && (
        <YouMightAlsoLike productId={pageData?.products[0]?.id} />
      )}
    </>
  );
};
export default CollectionPage;
