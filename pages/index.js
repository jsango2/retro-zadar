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
const Naslov = styled.h1`
  position: relative;

  font-size: 105px;
  font-family: "Garamond";
  font-weight: 700;
  /* font-style: bold;
  font-weight: 700; */
  /* text-shadow: 0px 2px 11px #0000006e; */
  @media screen and (max-width: 850px) {
    text-align: center;
    line-height: 100%;
  }
`;
const Mailto = styled.div`
  position: absolute;

  font-size: 15px;
  font-family: "Garamond";
  font-weight: 500;

  /* font-style: bold;
  font-weight: 700; */
  /* text-shadow: 0px 2px 11px #0000006e; */
  bottom: 30px;
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>

        <meta property="og:type" content="website" />

        <meta
          name="description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Stare fotografije grada Zadra na jedinstvenoj interaktivnoj mapi. Usporedite izgled grada nekad i sad."
        />

        <meta property="og:url" content="https://www.retrozadar.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Retro Zadar" />
        <meta
          property="og:description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Stare fotografije grada Zadra na jedinstvenoj interaktivnoj mapi. Usporedite izgled grada nekad i sad."
        />
        <meta property="og:image" content="https://retrozadar.com/og2.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="retrozadar.com" />
        <meta property="twitter:url" content="https://www.retrozadar.com" />
        <meta name="twitter:title" content="Retro Zadar" />
        <meta
          name="twitter:description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Stare fotografije grada Zadra na jedinstvenoj interaktivnoj mapi. Usporedite izgled grada nekad i sad."
        />
        <meta name="twitter:image" content="https://retrozadar.com/og2.png" />

        <meta name="robots" content="all" />
      </Head>{" "}
      <Wrap>
        <Naslov>RETRO ZADAR</Naslov>
        <Link href="/mapa">
          <Mapa>Mapa</Mapa>
        </Link>
        <Mailto>
          <Link href="mailto:retrozadar@gmail.com">retrozadar@gmail.com</Link>
        </Mailto>
      </Wrap>
    </>
  );
}
