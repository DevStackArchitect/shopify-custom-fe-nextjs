import ApiInstance from "@/actions/API";
import {sortOptions} from "@/const/Collection";

export function formatCollectionData(collectionData) {
  if (!collectionData?.body?.data?.collectionByHandle) return null;
  const collection = collectionData?.body?.data?.collectionByHandle;

  // Extract additional metafields
  const customTitle = collection?.customTitle?.value;
  const customSubtitle = collection?.customSubtitle?.value;
  const customLabel = collection?.customLabel?.value;

  // Extract the banner image URL
  const bannerImageUrl = collection?.metafield?.reference?.image.url;
  let inStockCount = 0;
  let outOfStockCount = 0;
  const productTypes = new Set();
  const variantOptionsSet = {};
  const brandSet = new Set();

  const formattedProducts =
    collectionData.body.data.collectionByHandle.products.edges.map(
      ({ node }) => {
        // Update product types set
        productTypes.add(node.productType);

        // First, parse the rating JSON string to an object
        let ratingData;
        if (node.rating && node.rating.value) {
          try {
            ratingData = JSON.parse(node.rating.value);
          } catch (error) {
            console.error('Error parsing rating data:', error);
            ratingData = null;
          }
        }
        const ratingCount = parseInt(node.ratingCount?.value) || 0;
        const rating = ratingData ? parseFloat(ratingData.value) || 0:0;
        if (node.vendor) {
          brandSet.add(node.vendor);
        }

        let productVariantOptionsSet = {};
        node.variants.edges.forEach(({ node: variant }) => {
          if (variant.availableForSale) {
            inStockCount++;
          } else {
            outOfStockCount++;
          }

          variant.selectedOptions.forEach((option) => {
            if (!productVariantOptionsSet[option.name]) {
              productVariantOptionsSet[option.name] = new Set();
            }
            productVariantOptionsSet[option.name].add(option.value);

            // Update global variant options set
            if (!variantOptionsSet[option.name]) {
              variantOptionsSet[option.name] = new Set();
            }
            variantOptionsSet[option.name].add(option.value);
          });
        });

        // Convert product variant options set to array
        const productVariantOptions = Object.keys(
          productVariantOptionsSet,
        ).reduce((acc, key) => {
          acc[key] = Array.from(productVariantOptionsSet[key]);
          return acc;
        }, {});

        const images = node.images.edges.map((edge) => ({
          src: edge.node.src,
          altText: edge.node.altText,
        }));

        // Format vendor handle
        const vendorHandle = node?.vendor
          ? node?.vendor?.toLowerCase().replace(/\s+/g, "-").trim()
          : "";

        return {
          id: node.id,
          title: node.title,
          productType: node.productType,
          description: node.description,
          tags: node.tags,
          handle: node.handle,
          vendor: node.vendor,
          vendorHandle,
          images,
          variantOptions: productVariantOptions, // Added product-specific variant options
          price: {
            minVariantPrice: {
              amount: node.priceRange.minVariantPrice.amount,
              currencyCode: node.priceRange.minVariantPrice.currencyCode,
            },
            maxVariantPrice: {
              amount: node.priceRange.maxVariantPrice.amount,
              currencyCode: node.priceRange.maxVariantPrice.currencyCode,
            },
          },
          ratingCount,
          rating,
        };
      },
    );

  const variantOptions = Object.keys(variantOptionsSet).reduce((acc, key) => {
    acc[key] = Array.from(variantOptionsSet[key]);
    return acc;
  }, {});
  const brandList = Array.from(brandSet);

  return {
    title: collectionData.body.data.collectionByHandle.title,
    description: collectionData.body.data.collectionByHandle.description,
    products: formattedProducts,
    productTypes: Array.from(productTypes),
    variantOptions, // Global variant options across all products
    inStockCount,
    outOfStockCount,
    brandList, // Add the array of unique vendor names here
    bannerImageUrl,
    customTitle,    // Add the custom title here
    customSubtitle, // Add the custom subtitle here
    customLabel,
  };
}


export async function getCollectionData(slug, filters) {
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
      ? `filters: [${filterQueryParts.join(", ")}]`
      : "";
  const query = `{
      collectionByHandle(handle: "${slug}") {
        id
        title
        description
        metafield(namespace: "custom", key: "banner") {
          value
           reference { 
            ... on MediaImage {
              image {
                url  
              }
            }
          }
        }
        customTitle: metafield(namespace: "custom", key: "title") {
          value
         }
        customSubtitle: metafield(namespace: "custom", key: "subtitle") {
           value
          }
          customLabel: metafield(namespace: "custom", key: "label") {
            value
          }
        products(first: 50, ${filterQuery},${sortQuery}) {
            edges {
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
              ratingCount: metafield(namespace: "reviews", key: "rating_count") {
                value
              }
              rating: metafield(namespace: "reviews", key: "rating") {
                value
              }
            }
          }
        }
      }
    }`;

  return ApiInstance({ query });
}

export async function getCollectionList() {
  const rawData = await ApiInstance({
    query: `{
      collections(first: 200) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              src
              altText
            }
            products(first: 1) {
              pageInfo {
                hasNextPage
              }
              edges {
                cursor
              }
            }
          }
        }
      }
    }`,
  });

  // Destructure the collections from the data object
  const { collections } = rawData.body.data;

  // Map over the edges to create a new array of collection objects
  return collections.edges.map(({ node }) => {
    // Use pageInfo to determine if there are products and the cursor to count them
    const hasProducts = node.products.pageInfo.hasNextPage;
    const productsCount = hasProducts
      ? "1+"
      : node.products.edges.length.toString();

    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description,
      imageSrc: node.image?.src || "",
      imageAltText: node.image?.altText || "",
      // Include the product count
      productsCount,
    };
  });
}

export async function getSingleCollectionData(slug) {
  const response = await ApiInstance({
    query: `{
      collectionByHandle(handle: "${slug}") {
        id
        title
        description
        image {
          src
          altText
        }
        products(first: 250) { 
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
            }
          }
        }
      }
    }`,
  });

  const collectionData = response?.body?.data?.collectionByHandle;

  // Check if the products array is present and properly fetched
  const products = collectionData?.products?.edges;
  const hasMoreProducts = collectionData?.products?.pageInfo?.hasNextPage;

  // Calculate product count, ensure it's defined
  const productCount = products ? products.length : 0;

  // Create a string representation, indicating if there are more products beyond the count
  const displayedProductCount = hasMoreProducts
    ? `${productCount}+`
    : productCount.toString();
  return {
    id: collectionData?.id,
    title: collectionData?.title,
    handle: slug,
    description: collectionData?.description,
    imageSrc: collectionData?.image?.src || "",
    imageAltText: collectionData?.image?.altText || "",
    productsCount: displayedProductCount,
  };
}
