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
  );
}
export default MyApp;
