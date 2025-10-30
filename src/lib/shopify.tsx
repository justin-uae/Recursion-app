import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
    storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string,
    apiVersion: '2024-01',
    publicAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string,
});

export default client;