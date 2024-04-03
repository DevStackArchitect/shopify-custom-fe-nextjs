import ApiInstance from "@/actions/API";

export async function getRecommendedProducts(productId) {
    if (!productId) {
        console.error('Error fetching product details for recommendation');
        return [];
    }


    const query = `
    {
      productRecommendations(productId: "${productId}") {
            id
            title
            productType
            description
            vendor
            tags
            handle
            images(first: 4) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            variants(first: 250) {
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
          }
    }
  `;

    try {
        const response = await ApiInstance({ query });

        // Use the formatCollectionData function to format the fetched products
        return formatRecommendationsData(response);
    } catch (error) {
        console.error('Error fetching recommended products:', error);
        return [];
    }
}
export function formatRecommendationsData(recommendationsData) {
    if (!recommendationsData?.body?.data?.productRecommendations) return null;

    const formattedProducts = recommendationsData.body.data.productRecommendations.map(product => {
        // Convert product variant options set to array
        let productVariantOptionsSet = {};
        product.variants.edges.forEach(variantEdge => {
            const variant = variantEdge.node;
            variant.selectedOptions.forEach(option => {
                if (!productVariantOptionsSet[option.name]) {
                    productVariantOptionsSet[option.name] = new Set();
                }
                productVariantOptionsSet[option.name].add(option.value);
            });
        });

        const productVariantOptions = Object.keys(productVariantOptionsSet).reduce((acc, key) => {
            acc[key] = Array.from(productVariantOptionsSet[key]);
            return acc;
        }, {});

        const images = product.images.edges.map(edge => ({
            src: edge.node.src,
            altText: edge.node.altText,
        }));

        // Format vendor handle
        const vendorHandle = product.vendor
            ? product.vendor.toLowerCase().replace(/\s+/g, "-").trim()
            : "";

        return {
            id: product.id,
            title: product.title,
            productType: product.productType,
            description: product.description,
            tags: product.tags,
            handle: product.handle,
            vendor: product.vendor,
            vendorHandle,
            images,
            variantOptions: productVariantOptions,
            price: {
                minVariantPrice: {
                    amount: product.priceRange.minVariantPrice.amount,
                    currencyCode: product.priceRange.minVariantPrice.currencyCode,
                },
                maxVariantPrice: {
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                },
            },
        };
    });

    return {
        products: formattedProducts,
    };
}
