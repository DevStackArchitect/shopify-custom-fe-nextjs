import React, { useState, useContext } from "react";
import styles from "./styles.module.scss";
import { Context } from "@/actions/AppContext";
import Image from "next/image";
import { useRouter } from "next/router";

const MobileNav = ({ openState, close }) => {
  const { menuData } = useContext(Context);
  const [activeMenuStack, setActiveMenuStack] = useState([]);
  const router = useRouter();

  if (!menuData) return null;

  const handleLinkClick = (url) => {
    router.push(url).then(() => close());
  };

  const handleRedirectionToPages = (cHandle) => {

      handleLinkClick(`/collection/${cHandle}`);
  };

  const handleMenuItemClick = (item) => {
    if (item.subItems && item.subItems.length > 0) {
      setActiveMenuStack((prev) => [...prev, item]);
    } else if (item.subSubItems && item.subSubItems.length > 0) {
      setActiveMenuStack((prev) => [...prev, item]);
    } else {
      // Redirection logic for menu items without subitems
      handleRedirectionToPages(item.handle, item.url);
    }
  };

  const handleBack = () => {
    setActiveMenuStack((prev) => prev.slice(0, -1));
  };

  const renderMenuItems = (items) => {
    return items?.map((item) => (
      <li key={item.id} onClick={() => handleMenuItemClick(item)}>
        {item.title}
        {(item.subItems && item.subItems.length > 0) ||
        (item.subSubItems && item.subSubItems.length > 0) ? (
          <span className={styles.arrow}>
            <Image
              src={"/images/chevron-right.svg"}
              alt={""}
              width={12}
              height={12}
            />
          </span>
        ) : null}
      </li>
    ));
  };

  const getCurrentMenuItems = () => {
    if (activeMenuStack.length === 0) {
      return menuData?.items;
    }

    const currentMenu = activeMenuStack[activeMenuStack.length - 1];
    return currentMenu?.subItems || currentMenu.subSubItems || [];
  };

  return (
    <div className={`${styles.wrapper} ${openState && styles.open}`}>
      {activeMenuStack.length > 0 && (
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>
      )}
      <ul>{renderMenuItems(getCurrentMenuItems())}</ul>
    </div>
  );
};

export default MobileNav;
