// import "../styles/index.css";
// import { motion as m } from "framer-motion"
// // import "../components/layout/layout.css";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { GoogleTagManager } from "@next/third-parties/google";
import { useState } from "react";

import { animations } from "../lib/animations";
import "../styles/index.css";
import "../styles/index2.css";
import Script from "next/script";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </>
  );
}
export default MyApp;
