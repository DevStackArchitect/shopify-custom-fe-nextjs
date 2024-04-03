# Custom Shopify Frontend with Next.js and Shopify GraphQL

This project is a custom Shopify frontend built using Next.js and Shopify's GraphQL API. It provides a clean and minimalistic interface with a comprehensive set of e-commerce functionalities.

## Features

Our custom Shopify frontend includes a wide range of features to enhance the shopping experience:

- User authentication (login/sign-up)
- Product search and discovery
- Wishlist management
- Add to cart and product detail page
- Collection page to browse products
- Checkout process with cart management
- Legal pages with placeholder content
- Product ratings, counts, and brand details

## Getting Started

To get started with this project, follow the steps below to set up your development environment.

### Prerequisites

Ensure you have the following installed:

- Node.js (recommended version 14 or later)
- npm or Yarn

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/DevStackArchitect/shopify-custom-fe-nextjs
    ```
2. Navigate to the project directory:
    ```bash
    cd shopify-custom-fe-nextjs
    ```
3. Install the project dependencies:
    ```bash
    npm install
    ```
4. Copy the .env.example file to a new file named .env, and update it with your Shopify store's details:
    ```bash
    cp .env.example .env
    ```
    ```bash
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token_here
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your_store_domain_here
    ```
Replace your_access_token_here and your_store_domain_here with your Shopify Storefront Access Token and Shopify Store Domain, respectively.

5. Start the development server:
    ```bash
    npm run dev
    ```
6. Open your browser and navigate to http://localhost:3000 to view the application.


### Contributing
We welcome contributions to improve this custom Shopify frontend! Please feel free to fork the repository, make your changes, and create a pull request to contribute.

### License
This project is open source and available under the MIT License.

### Acknowledgments
- Shopify GraphQL API
- Next.js Framework
- All contributors and supporters of this project


## Contact
For questions or contributions, please email me at [ashishsaiwal.dev@gmail.com](mailto:ashishsaiwal.dev@gmail.com).