import React from "react";

import Link from "next/link";

// import Seo from "../components/seo"
// import Bart from "../images/bart.png"
const NotFoundPage = () => {
  return (
    <>
      {/* <Seo title="404: Not found" /> */}
      <div className="container">
        <div className="wrapSuccess">
          <div>{/* <img src={Bart} width="100px" alt="bart" />{" "} */}</div>
          <h1 style={{ textAlign: "center", marginTop: "140px" }}>
            404: Stranica nije pronađena
          </h1>
          <p style={{ textAlign: "center", marginTop: "140px" }}>
            Upisali ste adresu koja ne postoji
          </p>

          <div style={{ textAlign: "center", marginTop: "140px" }}>
            <Link href="/">Vrati se</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
