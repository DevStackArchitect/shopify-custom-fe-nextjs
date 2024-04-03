import ApiInstance from "@/actions/API";
import { sortOptions } from "@/const/Collection";
function formatSearchResults(rawResults) {
  let inStockCount = 0;
  let outOfStockCount = 0;
  const productTypes = new Set();
  const variantOptionsSet = {};
  const brandSet = new Set();

  const formattedResults = rawResults.map((product) => {
    productTypes.add(product.productType);
    if (product.vendor) {
      brandSet.add(product.vendor);
    }

    const variants = product.variants.edges.map((variantEdge) => {
      const variant = variantEdge.node;
      if (variant.availableForSale) {
        inStockCount++;
      } else {
        outOfStockCount++;
      }

      variant.selectedOptions.forEach((option) => {
        if (!variantOptionsSet[option.name]) {
          variantOptionsSet[option.name] = new Set();
        }
        variantOptionsSet[option.name].add(option.value);
      });

      return {
        id: variant.id,
        title: variant.title,
        availableForSale: variant.availableForSale,
        price: variant.priceV2.amount,
        currencyCode: variant.priceV2.currencyCode,
        selectedOptions: variant.selectedOptions.map((option) => {
          return {
            name: option.name,
            value: option.value,
          };
        }),
      };
    });

    return {
      id: product.id,
      title: product.title,
      productType: product.productType,
      description: product.description,
      vendor: product.vendor,
      tags: product.tags,
      handle: product.handle,
      images: product.images.edges.map((imageEdge) => ({
        src: imageEdge.node.src,
        altText: imageEdge.node.altText,
      })),
      variants,
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
    results: formattedResults,
    inStockCount,
    outOfStockCount,
    productTypes: Array.from(productTypes),
    variantOptions: Object.fromEntries(
      Object.entries(variantOptionsSet).map(([key, value]) => [
        key,
        Array.from(value),
      ]),
    ),
    brands: Array.from(brandSet),
  };
}

export async function searchRelatedProducts(searchTerm, filters) {
  let searchQuery = "";
  let filterQueryParts = [];
  // Handle filters
  if (filters) {
    // Handle product type filter
    if (filters.productType && filters.productType.length > 0) {
      filters.productType.forEach((type) => {
        filterQueryParts.push(`{ productType: "${type}" }`);
      });
    }

    // Handle product vendor filter
    if (filters.productVendor && filters.productVendor.length > 0) {
      filters.productVendor.forEach((vendor) => {
        filterQueryParts.push(`{ productVendor: "${vendor}" }`);
      });
    }

    // Handle variant options filters (e.g., color, size)
    Object.entries(filters).forEach(([key, value]) => {
      if (
        key !== "productType" &&
        key !== "productVendor" &&
        Array.isArray(value)
      ) {
        value.forEach((option) => {
          if (option.name && option.value) {
            filterQueryParts.push(
              `{ variantOption: { name: "${option.name}", value: "${option.value}" } }`,
            );
          }
        });
      }
    });

    // Handle availability filter
    if (typeof filters.available === "boolean") {
      filterQueryParts.push(`{ available: ${filters.available} }`);
    }
  }

  let sortQuery = "";
  if (filters?.sort) {
    const selectedSortOption = sortOptions.find(
      (option) => option.value === filters.sort,
    );
    if (selectedSortOption) {
      sortQuery = selectedSortOption.query;
    } else {
      // Handle unknown sorting options or use a default sort
    }
  }

  // Combine filter query parts
  let filterQuery =
    filterQueryParts.length > 0
      ? `filter: { ${filterQueryParts.join(", ")} }`
      : "";

  // Include the search term in the query
  if (searchTerm) {
    searchQuery = `query: "title:*${searchTerm}* OR tags:*${searchTerm}* OR description:*${searchTerm}*"`;
  }

  const query = `{
    products(first: 250, ${searchQuery}${
      filterQuery ? `, ${filterQuery}` : ""
    }${sortQuery ? `, ${sortQuery}` : ""}) {      edges {
        node {
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
    }
  }`;

  try {
    const response = await ApiInstance({ query });
    const rawResults = response.body.data.products.edges.map(
      (edge) => edge.node,
    );
    return formatSearchResults(rawResults);
  } catch (error) {
    console.error("Error searching for products:", error);
    return [];
  }
}
