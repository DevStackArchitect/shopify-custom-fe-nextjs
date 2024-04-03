import React, {useContext, useEffect} from "react";
import {Context, ContextProvider} from "@/actions/AppContext";
import "@/styles/globals.css";
import {Inter, Lora} from "next/font/google";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
import Footer from "@/components/Footer";
import {Toaster} from "react-hot-toast";

import {fetchCartDetails} from "@/actions/Cart";
import {useRouter} from "next/router";
import {getMenuByHandle} from "@/actions/Menu";
import OptionSelectModal from "@/components/Product/OptionSelectModal";
import CartBottomPanel from "@/components/CartBottomPanel";
import CartModal from "@/components/Shared/CartModal";
import {getCustomerInfo} from "@/actions/Auth";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
});

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-secondary",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ContextProvider>
      <div className={`${inter.className} ${lora.className}`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontFamily: "var(--font-primary)",
            },
          }}
        />
        <TopBanner />
        <Header />
        <AppContent Component={Component} pageProps={pageProps} />
         <Footer />
      </div>
    </ContextProvider>
  );
}

function AppContent({ Component, pageProps }) {
  const {
    cart,
    setCart,
    setMenuData,
    selectedHandle,
    isOptionModalOpen,
    cartModalOpen,
    setCartModalOpen,
    setUserDetails,
  } = useContext(Context);

  useEffect(() => {
    fetchCardDetails();
    fetchMenuDetails();
    getLoggedUserDetails();
  }, []);

  const fetchCardDetails = async () => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      const response = await fetchCartDetails(cartId);
      setCart(response);
    }
  };

  const fetchMenuDetails = async () => {
    const response = await getMenuByHandle();
    setMenuData(response);
  };

  const getLoggedUserDetails = async () => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      try {
        const userResponse = await getCustomerInfo(token);
        if (userResponse.id) {
          setUserDetails(userResponse);
        }
      } catch (e) {
        localStorage.setItem("AccessToken", null);
      }
    }
  };

  return (
    <>
      {isOptionModalOpen && <OptionSelectModal handle={selectedHandle} />}
      <Component {...pageProps} />
      <CartModal open={cartModalOpen} close={() => setCartModalOpen(false)} />
      <CartBottomPanel fixed />
    </>
  );
}
