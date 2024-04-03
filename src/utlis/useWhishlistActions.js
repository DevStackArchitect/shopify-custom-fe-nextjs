const useWishlist = () => {
    const maxItems = 100; // Maximum number of items in the wishlist

    // Load wishlist from localStorage when the hook mounts
    const loadWishlistFromStorage = () => {
        const wishlistFromStorage = localStorage.getItem('wishlist');
        return wishlistFromStorage ? JSON.parse(wishlistFromStorage) : [];
    };

    // Save wishlist to localStorage when it changes
    const saveWishlistToStorage = (newWishlist) => {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const toggleProductWishlist = (productId) => {
        let currentWishlist = loadWishlistFromStorage();

        if (currentWishlist.includes(productId)) {
            // Remove product ID if it's already in the wishlist
            currentWishlist = currentWishlist.filter(id => id !== productId);
        } else {
            // Add product ID if it's not in the wishlist
            if (currentWishlist.length < maxItems) {
                currentWishlist.push(productId);
            } else {
                // Optional: Handle the case when the wishlist is full
                // Example: Replace the oldest item with the new one
                // currentWishlist.shift();
                // currentWishlist.push(productId);

                // Or simply do nothing or show an alert
            }
        }

        // Save the updated wishlist back to localStorage
        saveWishlistToStorage(currentWishlist);
    };

    const isProductInWishlist = (productId) => {
        // Fetch the latest wishlist data from localStorage
        const latestWishlist = loadWishlistFromStorage();
        return latestWishlist.includes(productId);
    };

    return { wishlist: loadWishlistFromStorage(), toggleProductWishlist, isProductInWishlist };
};

export default useWishlist;
