import AvailableOnPlatform from "@/components/Home/AvailableOnPlatform";
import Journal from "@/components/Home/Journal";
import React, {useEffect, useState} from "react";
import WhatsappBanner from "@/components/Home/WhatsappBanner";
import {getCollectionList} from "@/actions/Collection";

export default function Home() {
  const [pageData, setPageData] = useState([]);

  const fetchCollections = async () => {
    const collectionsList = await getCollectionList();
    const first20Items = collectionsList.slice(0, 20);
    console.log(first20Items);
    setPageData(first20Items);
  };
  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <>

      <AvailableOnPlatform
        heading={"Collection"}
        subheading={"Fing what you need"}
        data={pageData}
      />
      <WhatsappBanner />

      <Journal />
    </>
  );
}
