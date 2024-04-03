import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Container from "@/components/Shared/Container";
import Image from "next/image";
import Link from "next/link";
import { Context } from "@/actions/AppContext";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  const { menuData } = useContext(Context);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuTopOffset, setMenuTopOffset] = useState(0);
  const listContainerRef = useRef(null);

  const handleLinkClick = (url) => {
    router.push(url).then(() => setActiveMenu(null));
  };
  const toggleMenu = (menuItem) => {
    if (!menuItem.subItems || menuItem.subItems.length === 0) {
      handleRedirectionToPages(menuItem.handle);
    } else if (activeMenu && activeMenu.id === menuItem.id) {
      setActiveMenu(null);
    } else {
      // Open the new active menu
      setActiveMenu(menuItem);
    }
  };
  useEffect(() => {
    if (listContainerRef.current) {
      const rect = listContainerRef.current.getBoundingClientRect();
      setMenuTopOffset(rect.bottom + window.scrollY);
    }
  }, [listContainerRef]);


  const handleRedirectionToPages = (cHandle) => {
    handleLinkClick(`/collection/${cHandle}`);
  };

  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeMenu]);

  return (
    <>
      <div className={styles.wrapper}>
        <Container>
          <div className={styles.listContainer} ref={listContainerRef}>
            {menuData?.items?.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleMenu(item)}
                className={styles.navItem}
              >
                {item.title}
                {item.subItems && item.subItems.length > 0 && (
                  <Image
                    src={"/images/arrow-down.svg"}
                    alt={"arrow"}
                    width={10}
                    height={10}
                  />
                )}

                {/* Submenu */}
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div
        className={`${styles.menuWrapper} ${activeMenu != null && styles.open}`}
        style={{ top: `${menuTopOffset + 10}px` }}
      >
        <Container>
          <div className={styles.subMenuWrapper}>
            <div className={styles.submenuPanel}>
              {activeMenu?.subItems.map((subItem) => (
                <div key={subItem.id} className={styles.submenuColumn}>
                  <h3
                    className={styles.submenuTitle}
                    onClick={() => handleRedirectionToPages(subItem.handle)}
                  >
                    {subItem.title}
                  </h3>
                  <ul className={styles.submenuList}>
                    {subItem.subSubItems.map((subSubItem) => (
                      <li
                        key={subSubItem.id}
                        className={styles.submenuItem}
                        onClick={() =>
                          handleRedirectionToPages(subSubItem.handle)
                        }
                      >
                        {subSubItem.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navigation;
