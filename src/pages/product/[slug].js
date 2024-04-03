import ProductDescription from "@/components/Product/Description";
import RecentViewed from "@/components/CommonPass/RecentViewed";
import ProductOfferList from "@/components/Product/OfferList";
import BrandProductList from "@/components/Product/BrandProductList";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import {getProductDetailsByHandle} from "@/actions/Product";
import {Context} from "@/actions/AppContext";
import {updateRecentlyViewed} from "@/actions/RecentViewed";

const ProductDetails = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(Context);
  const [pageData, setPageData] = useState();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetchDetails();
    }
  }, [slug]);

  const fetchDetails = async () => {
    const response = await getProductDetailsByHandle(slug);
    if (response) {
      setPageData(response);
      updateRecentlyViewed(slug);
    }
  };

  return (
    <>
      {pageData && <ProductDescription data={pageData} />}
      {pageData?.featuresDetails && pageData?.featuresDetails.length > 0 && (
        <ProductOfferList list={pageData?.featuresDetails} />
      )}

      {pageData?.vendor && (
        <BrandProductList
          heading={`Explore further with the captivating world of <span>${pageData?.vendor}.</span>`}
          subheading={
            "Elevate your workspace with our premium and functional office supplies."
          }
          brand={pageData?.vendor}
        />
      )}
      <RecentViewed />
    </>
  );
};

export default ProductDetails;
