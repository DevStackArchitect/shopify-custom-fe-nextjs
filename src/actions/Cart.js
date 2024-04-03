import ApiInstance from "@/actions/API";

// Helper function to format cart data and calculate total price and total savings
export async function fetchCartDetails(cartId) {
  const rawData = await ApiInstance({
    query: `{
      cart(id: "${cartId}") {
        id
        checkoutUrl
        lines(first: 5) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    id
                    title
                    vendor
                    images(first: 1) {
                      edges {
                        node {
                          originalSrc
                        }
                      }
                    }
                  }
                  selectedOptions {
                    name
                    value
                  }
                  priceV2 {
                    amount
                  }
                  compareAtPriceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }`,
  });

  const { cart } = rawData.body.data;
  let totalPrice = 0;
  let totalSavings = 0;

  const items = cart.lines.edges.map(({ node }) => {
    const variant = node.merchandise;
    const price = parseFloat(variant.priceV2.amount);
    const compareAtPrice = parseFloat(variant.compareAtPriceV2?.amount || price);

    // Calculate savings only if compareAtPrice is greater than price
    const savings = compareAtPrice > price ? compareAtPrice - price : 0;
    const totalItemPrice = price * node.quantity;
    const totalItemSavings = savings * node.quantity;

    totalPrice += totalItemPrice;
    totalSavings += totalItemSavings;

    return {
      variantId: variant.id,
      quantity: node.quantity,
      id: node.id,
        vendor: variant.product.vendor,
      productId: variant.product.id,
      productTitle: variant.product.title,
      imageUrl: variant.product.images.edges[0]?.node.originalSrc || '/images/default-image.png', // Fallback to a default image if none is available
      variantOptions: variant.selectedOptions.map(option => ({
        name: option.name,
        value: option.value,
      })),
      price: price,
      compareAtPrice: compareAtPrice,
    };
  });

  return {
    cartId: cart.id,
    items: items,
    totalPrice: totalPrice.toFixed(2),
    totalSavings: totalSavings.toFixed(2),
    checkoutUrl: cart.checkoutUrl,
  };
}

// Function to create a new cart
export async function createCart(variantId, quantity) {
  const rawData = await ApiInstance({
    query: `mutation {
      cartCreate(input: {
        lines: [{ merchandiseId: "${variantId}", quantity: ${quantity} }]
      }) {
        cart {
          id
        }
      }
    }`,
  });

  const { cart } = rawData.body.data.cartCreate;
  localStorage.setItem("cartId", cart.id);

  return fetchCartDetails(cart.id);
}

// Function to add item to the cart
export async function addItemToCart(cartId, lineItems) {
  const lineItemsString = lineItems
    .map(
      (item) =>
        `{ merchandiseId: "${item.merchandiseId}", quantity: ${item.quantity} }`,
    )
    .join(", ");

  const addMutation = `
    mutation {
      cartLinesAdd(cartId: "${cartId}", lines: [${lineItemsString}]) {
        cart {
          id
        }
      }
    }
  `;

  await ApiInstance({ query: addMutation });
  return fetchCartDetails(cartId);
}

// Function to update the cart item quantity
export async function updateCartItemQuantity(cartId, lineItems) {
  const lineItemsString = lineItems
    .map((item) => `{ id: "${item.id}", quantity: ${item.quantity} }`)
    .join(", ");

  const updateMutation = `
    mutation {
      cartLinesUpdate(cartId: "${cartId}", lines: [${lineItemsString}]) {
        cart {
          id
        }
      }
    }
  `;

  await ApiInstance({ query: updateMutation });
  return fetchCartDetails(cartId);
}

export async function getCheckoutUrl(cartId) {
  const mutation = `mutation checkoutCreate($cartId: ID!) {
    checkoutCreate(input: {cartId: $cartId}) {
      checkout {
        id
        webUrl
      }
    }
  }`;

  try {
    const response = await ApiInstance({
      query: mutation,
      variables: { cartId: cartId },
    });

    const checkoutSession = response.body.data.checkoutCreate.checkout;
    return checkoutSession.webUrl;
  } catch (error) {
    console.error("Error creating checkout URL:", error);
    return null;
  }
}
