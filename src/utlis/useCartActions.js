import {useContext} from "react";
import {Context} from "@/actions/AppContext";
import {addItemToCart, createCart, updateCartItemQuantity,} from "@/actions/Cart";
import {toast} from "react-hot-toast";

export const useCartActions = () => {
  const { cart, setCart } = useContext(Context);

  const addToCart = async (variantId, quantity) => {
    if (cart.cartId) {
      // Check if the item already exists in the cart
      const existingItem = cart.items.find(
        (item) => item.variantId === variantId,
      );

      if (existingItem) {
        // If item exists and quantity changes, update the quantity
        if (existingItem.quantity !== quantity) {
          const updatedCartResponse = await updateCartItemQuantity(
            cart.cartId,
            [
              {
                id: existingItem.id, // Cart line item ID, not variant ID
                quantity: quantity,
              },
            ],
          );
          setCart(updatedCartResponse);
          return updatedCartResponse.cartId;
        } else {
          toast.error("Product already added to cart");
        }
      } else {
        // If item doesn't exist, add it to the cart
        const newCartResponse = await addItemToCart(cart.cartId, [
          {
            merchandiseId: variantId,
            quantity: quantity,
          },
        ]);
        setCart(newCartResponse);
        return newCartResponse.cartId;
      }
    } else {
      const newCartResponse = await createCart(variantId, quantity);
      if (newCartResponse.cartId) {
        setCart(newCartResponse);
        return newCartResponse.cartId;
      } else {
        toast.error("Error creating new cart");
      }
    }
  };

  const buyNow = async (variantId, quantity) => {
    if (!variantId || !quantity) return toast.error("Please select a variant");
    const cartId = await addToCart(variantId, quantity);
    if (cartId) {
      await goToCheckout();
    }
  };

  const goToCheckout = async () => {
    if (cart.checkoutUrl) {
      if (typeof window !== "undefined") {
        window.location.href = cart.checkoutUrl;
      }
    } else {
      toast.error("Cart Not Found");
    }
  };
  return { addToCart, buyNow, goToCheckout };
};
