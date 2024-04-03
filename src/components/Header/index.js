import styles from "./styles.module.scss";
import Container from "@/components/Shared/Container";
import Row from "@/components/Shared/Row";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { Context } from "@/actions/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import SearchInput from "@/components/Shared/Search";
import DesktopSearch from "@/components/Shared/DesktopSearch";
import CartModal from "@/components/Shared/CartModal";
import WishlistModal from "@/components/Shared/WishlistModal";
const Header = () => {
  const {
    cart,
    cartModalOpen,
    setCartModalOpen,
    userDetails,
    isOptionModalOpen,
  } = useContext(Context);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const [openWishlist, setOpenWishlist] = useState(false);

  const handleCartClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const right = window.innerWidth - rect.right;

    // Set the properties on the root element
    document.documentElement.style.setProperty(
      "--cart-modal-top",
      `${top + 40}px`,
    );
    document.documentElement.style.setProperty(
      "--cart-modal-right",
      `${right}px`,
    );

    setCartModalOpen(!cartModalOpen);
  };

  useEffect(() => {
    if (cartModalOpen || isOptionModalOpen || openWishlist) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartModalOpen, isOptionModalOpen, openWishlist]);

  return (
    <>
      <div className={styles.wrapper}>
        <Container>
          <Row>
            <Link href={"/"} onClick={() => setOpenMobileNav(false)}>
              <Image
                src={"https://placehold.co/150x30"}
                alt={"logo"}
                width={150}
                height={30}
              />
            </Link>
            <div className={styles.ctaList}>
              {userDetails ? (
                <div className={styles.auth}> {userDetails.displayName}</div>
              ) : (
                <Link href={"/auth/sign-in"} className={styles.auth}>
                  <Image
                    src={"/images/User.svg"}
                    alt={"aut"}
                    height={20}
                    width={20}
                  />
                  <div>
                    Login <span>/</span> Signup
                  </div>
                </Link>
              )}
              <DesktopSearch />
              <div className={styles.wishlistContainer}>
                <Image
                  src={"/images/Heart.svg"}
                  alt={"fac"}
                  width={24}
                  height={24}
                  onClick={() => setOpenWishlist(true)}
                />
                <WishlistModal
                  close={() => setOpenWishlist(false)}
                  open={openWishlist}
                />
              </div>
              <div className={styles.cartContainer} onClick={handleCartClick}>
                <Image
                  src={"/images/ShoppingCartSimple.svg"}
                  alt={"cart"}
                  width={24}
                  height={24}
                />
                <div className={styles.count}>{cart.items.length}</div>
              </div>
              <Image
                src={openMobileNav ? "/images/close.svg" : "/images/List.svg"}
                alt={"cart"}
                width={24}
                height={24}
                className={styles.list}
                onClick={() => setOpenMobileNav(!openMobileNav)}
              />
            </div>
          </Row>
          <SearchInput />
        </Container>
      </div>
      <Navigation />
      <MobileNav
        openState={openMobileNav}
        close={() => setOpenMobileNav(false)}
      />
    </>
  );
};
export default Header;
