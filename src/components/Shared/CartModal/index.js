import styles from "./styles.module.scss";
import Image from "next/image";
import { useContext, useState } from "react";
import CartBottomPanel from "@/components/CartBottomPanel";
import CartModalItem from "@/components/Shared/CartModalItem";
import { Context } from "@/actions/AppContext";
import Recommanded from "@/components/Recommanded";
const CartModal = ({ open, close }) => {
  const { cart } = useContext(Context);

  if (!open) return null;
  return (
    <>
      <div className={styles.underLay} onClick={() => close()}></div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h5>Shopping Cart</h5>
          <Image
            src={"/images/close.svg"}
            alt={"close"}
            width={24}
            height={24}
            className={styles.close}
            onClick={() => close()}
          />
        </div>

        {cart && cart.items > 0 ? (
          <>
            <div className={styles.cartItem}>
              <ul>
                {cart.items.map((item) => (
                  <li key={item.variantId}>
                    <CartModalItem data={item} />
                  </li>
                ))}
              </ul>
            </div>
            <Recommanded vendor={cart?.items[0]?.productId} close={close} />
            <div>
              <CartBottomPanel />
            </div>
          </>
        ) : (
          <div className={styles.emptyCart}>
            <h5>Your cart is empty</h5>
          </div>
        )}
      </div>
    </>
  );
};
export default CartModal;
