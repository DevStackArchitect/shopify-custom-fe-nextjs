/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

module.exports = withPWA({
  // output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["picsum.photos", "liberationcoaches.com", "cdn.shopify.com"],
  },
});
