import Link from "next/link";
import React from "react";
// import Logo from "../images/logoRunZd.png"
import Layout from "./../components/layout";
import Script from "next/script";

function success() {
  return (
    <Layout>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <div className="container">
        <div className="wrapSuccess">
          <lottie-player
            src="https://assets8.lottiefiles.com/private_files/lf30_nsqfzxxx.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            autoplay
          ></lottie-player>
          {/* <img src={Logo} width="80%" alt="logo" /> */}
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>Hvala Vam na prijavi!</h2>
            <p>
              Na vašu e-mail adresu će te uskoro dobiti sve potrebne informacije
            </p>
            <div className="linkBack">
              <Link href="/">
                <div className="linkBack">Povratak na početnu stranicu</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default success;
