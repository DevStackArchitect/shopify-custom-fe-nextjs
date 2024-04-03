const ApiInstance = async ({ query, variables }) => {
  const endpoint = `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2021-07/graphql.json`;
  const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: { query, variables } && JSON.stringify({ query, variables }),
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    // console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
};

export default ApiInstance;
