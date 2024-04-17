// import "../styles/index.css";
// import { motion as m } from "framer-motion"
// // import "../components/layout/layout.css";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";

import { useState } from "react";

import { animations } from "../lib/animations";
import "../styles/index.css";
import "../styles/index2.css";
import Script from "next/script";

const pages = [
  { href: "/", name: "Index" },
  { href: "/blog", name: "One" },
];

function MyApp({ Component, pageProps, router }) {
  const startIndex = 2;
  const [animation, setAnimation] = useState(animations[startIndex]);
  const [exitBefore, setExitBefore] = useState(false);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}',{
          page_path: window.location.pathname,
          
![image](https://cdn.sanity.io/images/dgsq0x0m/production/61f24596fb210134e5df6a1dfa285de0f24791cc-1549x601.png?w=450)});
         `}
      </Script>

      <div className="app-wrap">
        <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter={!exitBefore}>
            <m.div
              key={router.route.concat(animation.name)}
              className="page-wrap"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animation.variants}
              transition={animation.transition}
            >
              <Component {...pageProps} />
            </m.div>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </>
  );
}
export default MyApp;
