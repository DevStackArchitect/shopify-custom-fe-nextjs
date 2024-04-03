import ApiInstance from "@/actions/API";

export async function getRecentBlogPosts() {
    const query = `
    {
      articles(first: 3, sortKey: UPDATED_AT, reverse: true) {
          edges {
          node {
            id
            title
            handle
            image {
              src
              altText
            }
             blog {
                handle
            }
          }
        }
      }
    }
  `;

    try {
        const response = await ApiInstance({ query });
        const blogPosts = response?.body?.data?.articles?.edges.map(({ node }) => ({
            name: node.title,
            id: node.id,
            handle: node.handle,
            image: node.image ? {
                src: node.image.src,
                altText: node.image.altText
            } : null
        }));

        return blogPosts;
    } catch (error) {
        console.error('Error fetching recent blog posts:', error);
        return [];
    }
}

export async function getAllBlogPosts() {
    const query = `
    {
      articles(first: 250, sortKey: UPDATED_AT, reverse: true) {
          edges {
          node {
            id
            title
            handle
            excerptHtml
            image {
              src
              altText
            }
            publishedAt
             blog {
                handle
            }
          }
        }
      }
    }
  `;

    try {
        const response = await ApiInstance({ query });
        const blogPosts = response?.body?.data?.articles?.edges.map(({ node }) => ({
            name: node.title,
            id: node.id,
            handle: node.handle,
            excerptHtml: node.excerptHtml,
            publishedAt: node.publishedAt,
            image: node.image ? {
                src: node.image.src,
                altText: node.image.altText
            } : null
        }));

        return blogPosts;
    } catch (error) {
        console.error('Error fetching recent blog posts:', error);
        return [];
    }
}



export async function getBlogDetailsByHandle(articleHandle) {
    const blogHandleName = ""; // this will same for all blog posts , second handle will be article handle
    const query = `
    {
      blogByHandle(handle: "${blogHandleName}") {
        articleByHandle(handle: "${articleHandle}") {
          title
          handle
          contentHtml
          image {
            src
            altText
          }
          publishedAt
          tags
          authorV2 {
            name
            bio
          }
        }
      }
    }`;

    try {
        const response = await ApiInstance({ query });

        // Check if the article is present
        const article = response?.body?.data?.blogByHandle?.articleByHandle;
        if (!article) {
            console.log('No article found for the provided handle:', handle);
            return null;
        }

        return {
            title: article.title,
            handle: article.handle,
            contentHtml: article.contentHtml,
            image: article.image ? {
                src: article.image.src,
                altText: article.image.altText
            } : null,
            publishedAt: article.publishedAt,
            tags: article.tags,
            author: article.authorV2 ? {
                name: article.authorV2.name,
                bio: article.authorV2.bio,
            } : null
        };
    } catch (error) {
        console.error('Error fetching blog details:', error);
        return null;
    }
}
