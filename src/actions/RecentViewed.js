import { getProductDetailsByHandle } from "@/actions/Product";

export function updateRecentlyViewed(productId) {
  if (typeof window !== "undefined") {
    let recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewedProducts")) || [];
    recentlyViewed.unshift(productId);
    recentlyViewed = [...new Set(recentlyViewed)].slice(0, 4);
    localStorage.setItem(
      "recentlyViewedProducts",
      JSON.stringify(recentlyViewed),
    );
  }
}
export async function getRecentlyViewedProducts() {
  const recentlyViewedIds =
    JSON.parse(localStorage.getItem("recentlyViewedProducts")) || [];

  if (recentlyViewedIds.length === 0) {
    return [];
  } else {
    const productDetails = await Promise.all(
      recentlyViewedIds.map(async (id) => {
        // Replace this with your actual API call to fetch product details
        return await getProductDetailsByHandle(id);
      }),
    );
    return productDetails
  }
}
