import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], id: null });
  const [menuData, setMenuData] = useState(null);
  const [selectedHandle, setSelectedHandle] = useState(null);
  const [isOptionModalOpen, setOptionModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // [1
  const openOptionModal = (handle) => {
    setSelectedHandle(handle);
    setOptionModalOpen(true);
  };

  const closeOptionModal = () => {
    setOptionModalOpen(false);
  };



  return (
    <Context.Provider
      value={{
        cart,
        setCart,
        menuData,
        setMenuData,
        selectedHandle,
        isOptionModalOpen,
        openOptionModal,
        closeOptionModal,
        cartModalOpen,
        setCartModalOpen,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
};
