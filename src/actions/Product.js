import ApiInstance from "@/actions/API";

export async function getRecommendedCollectionProductIds() {
  const recommendedCollectionHandle = ""; // Add the handle of the recommended collection
  const query = `{
    collectionByHandle(handle: "${recommendedCollectionHandle}") {
      products(first: 250) {
        edges {
          node {
            id
          }
        }
      }
    }
  }`;

  try {
    const response = await ApiInstance({ query });

    const products = response?.body?.data?.collectionByHandle?.products?.edges;
    return products.map(({ node }) => node.id);
  } catch (error) {
    console.error("Error fetching collection products:", error);
    return [];
  }
}




export async function getProductDetailsByHandle(handle) {
  const query = `
    {
      productByHandle(handle: "${handle}") {
        id
        handle
        title
        descriptionHtml
        vendor 
        availableForSale
        totalInventory
         options {
           id
            name
            values
        }
        images(first: 10) {
          edges {
            node {
              src
              altText
            }
          }
        }
        ratingCount: metafield(namespace: "reviews", key: "rating_count") {
          value
        }
        rating: metafield(namespace: "reviews", key: "rating") {
          value
        }
         reviews: metafield(namespace: "spr", key: "reviews") {
          value
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        featuresDetails: metafield(namespace: "custom", key: "features_details") {
          value
        }
      }
    }
  `;

  try {
    const response = await ApiInstance({ query });
    return formatProductData(response.body.data.productByHandle);
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

function formatProductData(productData) {
  let featuresDetails = [];
  let reviews = [];
  try {
    // Check if featuresDetails and its value are defined
    if (productData?.featuresDetails?.value) {
      // Parse the featuresDetails metafield value as JSON
      const parsedFeaturesDetails = JSON.parse(productData.featuresDetails.value);

      // Check if parsed data has a 'list' key and it's an array
      if (parsedFeaturesDetails.list && Array.isArray(parsedFeaturesDetails.list)) {
        featuresDetails = parsedFeaturesDetails.list;
      }
    }
  } catch (error) {
    console.error('Error parsing featuresDetails:', error);
    featuresDetails = []; // Reset to empty array in case of error
  }
  try {
    if (productData?.reviews?.value) {
      reviews = JSON.parse(productData.reviews.value);
    }
  } catch (error) {
    console.error('Error parsing reviews:', error);
    reviews = []; // Reset to empty array in case of error
  }
  // Parse the rating count and rating
  const ratingCount = parseInt(productData.ratingCount?.value) || 0;
  const rating = parseFloat(productData.rating?.value) || 0;
  return {
    id: productData.id,
    title: productData.title,
    handle: productData.handle,
    descriptionHtml: productData.descriptionHtml,
    vendor: productData.vendor,
    images: productData.images.edges.map(edge => ({
      src: edge.node.src,
      altText: edge.node.altText
    })),
    price: {
      minVariantPrice: {
        amount: productData.priceRange.minVariantPrice.amount,
        currencyCode: productData.priceRange.minVariantPrice.currencyCode,
      },
      maxVariantPrice: {
        amount: productData.priceRange.maxVariantPrice.amount,
        currencyCode: productData.priceRange.maxVariantPrice.currencyCode,
      },
    },
    minPrice: `${productData.priceRange.minVariantPrice.amount} ${productData.priceRange.minVariantPrice.currencyCode}`,
    maxPrice: `${productData.priceRange.maxVariantPrice.amount} ${productData.priceRange.maxVariantPrice.currencyCode}`,
    availability: productData.availableForSale,
    totalInventory: productData.totalInventory,
    featuresDetails,
    rating,
    ratingCount,
    variants: productData.variants.edges.map(edge => {
      const variant = edge.node;
      return {
        id: variant.id,
        title: variant.title,
        availableForSale: variant.availableForSale,
        price: `${variant.priceV2.amount} ${variant.priceV2.currencyCode}`,
        selectedOptions: variant.selectedOptions.map(option => ({
          name: option.name,
          value: option.value,
          // Add color code extraction logic if option.name is 'Color'
        }))
      };
    }),
    options: productData.options.map(option => ({
      id: option.id,
      name: option.name,
      values: option.values,
    }))
  };
}
