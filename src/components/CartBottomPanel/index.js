import styles from "./styles.module.scss";
import { Context } from "@/actions/AppContext";
import { useContext } from "react";
import { useCartActions } from "@/utlis/useCartActions";
const CartBottomPanel = ({ fixed }) => {
  const { cart, setCartModalOpen } = useContext(Context);
  const { goToCheckout } = useCartActions();

  if (!cart.cartId) return null;

  return (
    <div className={`${styles.wrapper} ${fixed ? "" : styles.blockLine}`}>
      <div className={styles.container}>
        <div className={styles.itemsContainer}>
          <div className={styles.items}>
            {cart.items.length} Items <div className={styles.divider}></div>₹
            {cart?.totalPrice}
          </div>
          {cart.totalSavings !== "0.00" && (
            <div className={styles.saved}>₹{cart.totalSavings} Saved</div>
          )}
        </div>
        {fixed ? (
          <div className={styles.view} onClick={() => setCartModalOpen(true)}>
            View Cart
          </div>
        ) : (
          <div className={styles.view} onClick={() => goToCheckout()}>
            Check out
          </div>
        )}
      </div>
    </div>
  );
};
export default CartBottomPanel;
