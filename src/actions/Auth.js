import ApiInstance from "@/actions/API"; // or any other HTTP client

export const customerCreate = async (email, password, firstName, lastName) => {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
    },
  };

  try {
    const response = await ApiInstance({
      query,
      variables,
    });

    return response.data.data.customerCreate;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Error creating customer");
  }
};

export async function customerAccessTokenCreate(email, password) {
  const query = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
                customerAccessToken {
                    accessToken
                    expiresAt
                }
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }
    `;

  const variables = {
    input: {
      email,
      password,
    },
  };

  try {
    const response = await ApiInstance({
      query,
      variables,
    });
    return response.body.data.customerAccessTokenCreate;
  } catch (error) {
    console.error("Error creating customer access token:", error);
    throw new Error("Error creating customer access token");
  }
}

export async function getCustomerInfo(accessToken) {
  const query = `
        query {
  customer(customerAccessToken: "${accessToken}") {
    id
    email
    displayName
        }
    }

    `;

  try {
    const response = await ApiInstance({
      query,
    });

    return response.body.data.customer;
  } catch (error) {
    console.error("Error fetching customer information:", error);
    throw new Error("Error fetching customer information");
  }
}
