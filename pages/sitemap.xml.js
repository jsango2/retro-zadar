import React from "react";

import { getAllPostsWithSlug, getPostAndMorePosts } from "../lib/api";

const Sitemap = () => {};

const allPosts = getAllPostsWithSlug();

export const getServerSideProps = async ({ res }) => {
  const baseUrl = "https://www.runzadar.com";

  const allPosts = await getAllPostsWithSlug();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPosts.edges
      .map((node) => {
        console.log(node.node);
        return `
            <url>
              <loc>https://www.runzadar.com/posts/${node.node.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join("")}
      <url>
      <loc>https://www.runzadar.com</loc>
      <lastmod>2022-06-01</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
     <url>
      <loc>https://www.runzadar.com/blog</loc>
      <lastmod>2022-06-01</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
     <url>
      <loc>https://www.runzadar.com/kalkulator</loc>
      <lastmod>2022-06-01</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
    <loc>https://www.runzadar.com/christmasrun</loc>
    <lastmod>2022-10-10</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
