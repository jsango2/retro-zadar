import React from "react";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = "https://www.retrozadar.com";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   
      <url>
      <loc>https://www.retrozadar.com</loc>
      <lastmod>2024-01-01</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
     <url>
      <loc>https://www.runzadar.com/mapa</loc>
      <lastmod>2022-01-01</lastmod>
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
