import { createStorefrontApiClient } from '@shopify/storefront-api-client';
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;

const client = createStorefrontApiClient({
    storeDomain: domain as string,
    apiVersion: '2024-01',
    publicAccessToken: token as string,
});

export default client;