import _ from 'lodash';

export const findData = (data, title) => {
    let result = null;
    const formattedTitle = title.toLowerCase().trim().replaceAll('-',' ');

    // Recursive function to search through the data
    const findInData = (items) => {
        if (!items || result) return; // Stop if no items or result is found

        for (const item of items) {
            if (item.title.toLowerCase().trim() === formattedTitle) {
                result = item;
                return; // Found the item, exit the loop
            }
            // Search in subItems and subSubItems
            findInData(item.subItems);
            if (item.subItems) {
                for (const subItem of item.subItems) {
                    findInData(subItem.subSubItems);
                }
            }
        }
    };

    findInData(data);
    return result;
};


export function createSortQuery(sortValue) {
    switch (sortValue) {
        case 'Featured':
            // Assuming 'MANUAL' is the sort key for featured items
            return 'sortKey: MANUAL, reverse: false';
        case 'Best selling':
            return 'sortKey: BEST_SELLING, reverse: false';
        case 'Alphabetically, A-Z':
            return 'sortKey: TITLE, reverse: false';
        case 'Alphabetically, Z-A':
            return 'sortKey: TITLE, reverse: true';
        case 'Price, low to high':
            return 'sortKey: PRICE, reverse: false';
        case 'Price, high to low':
            return 'sortKey: PRICE, reverse: true';
        case 'Date, old to new':
            return 'sortKey: CREATED_AT, reverse: false';
        case 'Date, new to old':
            return 'sortKey: CREATED_AT, reverse: true';
        default:
            return '';
    }
}
