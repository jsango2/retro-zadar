import React from "react";
import Script from "next/script";

import Layout from "./../components/layout";
import Link from "next/link";

// import Seo from "../components/seo"
// import Bart from "../images/bart.png"
const NotFoundPage = () => (
  <Layout>
    <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />

    {/* <Seo title="404: Not found" /> */}
    <div className="container">
      <div className="wrapSuccess">
        <lottie-player
          src="https://assets4.lottiefiles.com/packages/lf20_MEWs9a.json"
          background="transparent"
          speed="1"
          autoplay
          loop
          style={{
            width: "500px",
            height: "500px",
            position: "absolute",
            top: "50px",
          }}
        ></lottie-player>
        <div>{/* <img src={Bart} width="100px" alt="bart" />{" "} */}</div>
        <h1 style={{ textAlign: "center", marginTop: "140px" }}>
          404: Stranica nije pronađena
        </h1>
        <p>Upisali ste adresu koja ne postoji</p>

        <div
          style={{ marginTop: "30px", textDecoration: "none", color: "white" }}
        >
          <Link href="/">Vrati se</Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
