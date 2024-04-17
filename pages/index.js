import Head from "next/head";
import FirebaseUpload from "../components/firebaseUpload";
import styled from "styled-components";
import Link from "next/link";

const Wrap = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 850px) {
  }
`;
const Naslov = styled.div`
  position: relative;

  font-size: 105px;
  font-family: "Garamond";
  /* font-style: bold;
  font-weight: 700; */
  /* text-shadow: 0px 2px 11px #0000006e; */
  @media screen and (max-width: 850px) {
    text-align: center;
    line-height: 100%;
  }
`;

const Mapa = styled.div`
  text-decoration: underline;
  cursor: pointer;
  @media screen and (max-width: 850px) {
  }
`;
export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Retro Zadar</title>
        <meta property="og:title" content="Retro Zadar" key="title" />
        <link
          rel="canonical"
          href="https://www.retrozadar.com"
          key="canonical"
        />

        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:url" content="https://www.retrozadar.com" />

        <meta property="og:image" content="/og.png" />
        <meta
          name="description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Retro Zadar je jedinstvena mapa starih fotografija grada."
          key="desc"
        />
        <meta
          property="og:description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Retro Zadar je jedinstvena mapa starih fotografija grada."
        />
        <meta
          property="twitter:description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Retro Zadar je jedinstvena mapa starih fotografija grada."
        />
      </Head>{" "}
      <Wrap>
        <Naslov>RETRO ZADAR</Naslov>
        <Link href="/mapa">
          <Mapa>Mapa</Mapa>
        </Link>
      </Wrap>
    </>
  );
}
