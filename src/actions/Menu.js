import ApiInstance from "@/actions/API";

const extractSlugFromUrl = (url) => {
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  return path.split("/").pop();
};

export async function getMenuByHandle() {
  const query = `
    {
      menu(handle: "main-menu") {
        id
        handle
        title
        items {
          id
          title
          url
          items {
            id
            title
            url
            items {  
            id
            title
            url
          }
          }
        }
      }
    }
  `;

  const rawData = await ApiInstance({
    query: query,
  });

  // Check if the menu data is available in the response
  const menuData = rawData.body?.data?.menu;

  if (!menuData) {
    throw new Error("Menu data not found");
  }

  // Map over the menu items to create a structured menu object
  const formattedMenu = {
    id: menuData.id,
    handle: menuData.handle,
    title: menuData.title,
    items: menuData.items.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      handle: extractSlugFromUrl(item.url),
      subItems: item.items.map((subItem) => ({
        id: subItem.id,
        title: subItem.title,
        url: subItem.url,
        handle: extractSlugFromUrl(subItem.url),
        subSubItems: subItem.items.map((subsubItem) => ({
          id: subsubItem.id,
          title: subsubItem.title,
          url: subsubItem.url,
          handle: extractSlugFromUrl(subsubItem.url),
        })),
      })),
    })),
  };

  return formattedMenu;
}
