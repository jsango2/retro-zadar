// import { Link } from "gatsby"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../button/button.js";
// import { useHistory } from "react-router-dom"
import { WrapAll } from "./style.js";
// import scrollTo from "gatsby-plugin-smoothscroll"
// import { AnchorLink } from "gatsby-plugin-anchor-links"
// import { HashLink } from "react-router-hash-link";
import { Anchor } from "nextjs-anchor";

const MeniMobile = ({ isOpen, setIsOpen }) => {
  // const history = useHistory()
  // const goToHome = () => {
  //   // console.log("klikni")
  //   // let path = `/`
  //   // history.push(path)
  // }
  return (
    <>
      <div className={`menu ${isOpen ? "openMenu" : "closedMenu"}`}>
        <Link
          className="mobileLinks"
          href="/blog"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Blog
        </Link>
        <Link
          className="mobileLinks"
          href="/kalkulator"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Kalkulator
        </Link>
        <Link className="navLink" href="/christmasrun">
          Zadar Christmas Run
        </Link>
        <a className="mobileLinks" href="http://www.zadarnight.run">
          ZadarNight.run
        </a>
        <div className="mobileLinks">
          {/* <Link
            to="/"
            onClick={() => {
              setIsOpen(false)
            }}
          > */}
          <div
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {" "}
            <Anchor href="/#prijava">
              <Button
                title="Prijava"
                width="81"
                height="40"
                colorText="black"
                fontSize="16"
                fontWeight="600"
              />
            </Anchor>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeniMobile;
