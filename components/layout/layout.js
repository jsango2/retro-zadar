// import React from "react"
// import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

// import "./layout.css";
// import Footer from "../footer/footer";
// import { Helmet } from "react-helmet";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Header siteTitle={`Title`} /> */}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: "1400px",
          padding: `0`,
        }}
      >
        <main>{children}</main>

        {/* <Footer /> */}
      </div>
    </>
  );
};

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Layout;
