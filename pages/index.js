import Head from "next/head";
import FirebaseUpload from "../components/firebaseUpload";
import styled from "styled-components";
import Link from "next/link";
import Lottie, { useLottie } from "lottie-react";
import animacija from "../components/lottie2/lottie.json";
import useWindowSize from "../components/helper/usewindowsize";

const Wrap = styled.div`
  position: relative;
  height: auto;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 100px;

  @media screen and (max-width: 720px) {
    padding-top: 70px;
    padding-left: 30px;
    justify-content: space-around;
    padding-bottom: 30px;
  }
`;
const WrapText = styled.div`
  position: relative;
  height: 620px;
  width: 530px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  @media screen and (max-width: 720px) {
    width: 90%;
    height: auto;
  }
`;
const Overlay = styled.div`
  position: absolute;
  height: 100vh;
  width: 40vw;
  background: linear-gradient(270deg, #f0e7db 0%, #e7dac6 100%);
  left: 0;
  z-index: 1;
  @media screen and (max-width: 720px) {
    height: 55%;
    width: 100vw;
    background: linear-gradient(0deg, #f0e7db 0%, #e7dac6 100%);
    top: 0;
  }
`;
const Grain = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-image: url(https://grainy-gradients.vercel.app/noise.svg); /* The image used */
  /* background-color: #cccccc; Used if the image is unavailable */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  left: 0;
  z-index: 3;
  pointer-events: none;
  opacity: 0.3;
  top: 0;
  @media screen and (max-width: 720px) {
  }
`;
const Overlay2 = styled.div`
  position: absolute;
  height: 100vh;
  width: 40vw;
  background: linear-gradient(90deg, #f0e7db 0%, rgba(240, 231, 219, 0) 100%);
  left: 40vw;
  z-index: 1;

  @media screen and (max-width: 720px) {
    height: 45%;
    width: 100vw;
    background: linear-gradient(
      180deg,
      #f0e7db 0%,
      #f0e7db 20%,
      #e7dac673 100%
    );
    top: 55%;
    left: 0;
  }
`;
const LeftOverlay = styled.div`
  position: absolute;
  height: 100vh;
  width: 40vw;
  left: 0;
  z-index: 1;
  background-image: url("/plan.jpeg");
  @media screen and (max-width: 720px) {
    height: 60vh;
    width: 100vw;

    top: 0;
    left: 0;
  }
`;
const BGimage = styled.div`
  position: absolute;
  height: 100vh;
  width: 80vw;
  /* background-image: url("/laureana1b.png"); The image used */
  background-color: #f0e7db;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  right: 0;
  z-index: 0;

  @media screen and (max-width: 720px) {
    top: 50vh;
    height: 50vh;
    width: 100vw;
  }
`;
const Naslov = styled.h1`
  position: relative;
  z-index: 2;

  font-size: 75px;
  font-family: "Garamond";
  font-weight: 700;
  color: #3f230f;

  /* font-style: bold;
  font-weight: 700; */
  /* text-shadow: 0px 2px 11px #0000006e; */
  @media screen and (max-width: 720px) {
    font-size: 45px;

    text-align: left;
    line-height: 100%;
  }
`;
const Mailto = styled.div`
  position: absolute;
  z-index: 2;

  font-size: 15px;
  font-family: "Garamond";
  font-weight: 500;
  color: #3f230f;
  bottom: 50px;
  /* font-style: bold;
  font-weight: 700; */
  /* text-shadow: 0px 2px 11px #0000006e; */
  /* margin-top: auto; */

  @media screen and (max-width: 850px) {
    position: relative;

    text-align: left;
    line-height: 100%;
    margin-top: 30px;
    height: 20px;
    bottom: unset;
  }
`;

const Mapa = styled.div`
  position: relative;
  margin-top: 30px;
  width: 203px;
  height: 56px;
  flex-shrink: 0;
  border: 3px solid #bda593;
  background: #f7f2ed;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-weight: 700;
  z-index: 2;
  font-size: 16px;

  color: #3f230f;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(1px);
    box-shadow: 0 0 rgba(0, 0, 0, 0);
  }
  @media screen and (max-width: 850px) {
    font-size: 14px;
  }
`;
const Text = styled.h1`
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  text-align: left;
  color: #3f230f;
  z-index: 2;

  @media screen and (max-width: 650px) {
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
  }
`;
export default function IndexPage() {
  const size = useWindowSize();

  return (
    <>
      <Head>
        <title>Retro Zadar</title>
        <meta property="og:title" content="Retro Zadar" key="title" />
        <link rel="canonical" href="https://retrozadar.com" key="canonical" />
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
        <meta
          name="keywords"
          content="stare fotografije zadra, nekad, sad, zadar, razglednice"
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
        {" "}
        <Lottie className="lottieHero" animationData={animacija} />
        <Overlay />
        <Overlay2 />
        {/* <LeftOverlay /> */}
        <Grain />
        <BGimage />
        <WrapText>
          <Naslov>RETRO ZADAR</Naslov>
          <Text>
            Na jedinstvenoj interaktivnoj mapi usporedite život Zadra nekad i
            sad.
            <div style={{ height: "10px" }}></div>U nastojanju da spojimo
            njegovu bogatu prošlost i živuću sadašnjost ovo je projekt dvojice
            Zadrana nastao iz čiste ljubavi prema vlastitom gradu i neizmjernog
            poštovanja prema njegovoj urbanoj povijesti, a sve u nadi kako će
            nas upravo ove stare fotografije Zadra potaknuti na promišljanje o
            njegovoj budućnosti.
            <div style={{ height: "10px" }}></div>
            Projekt nije i nikada neće imati komercijalni karakter. Ovo je
            poklon svim Zadrankama i Zadranima koji ovaj grad žive! Kod svih
            objavljenih povijesnih fotografija navedeno je ime autora gdje god
            nam je ono bilo poznato.
            <div style={{ height: "10px" }}></div>
            Retro Zadar je mapa koja nije konačna već nam je želja da se uporno
            obogaćuje fotografijama iz svakog kutka našeg grada. Nadamo se da
            ćete nam u tome i vi pomoći.
            <div style={{ height: "10px" }}></div>
            Jer “tko kaže da ovog grada nesta ispod neba, staro mu kamenje samo
            zazvati treba na stara mjesta, i bit će grad”!
          </Text>
          <Link href="/mapa">
            <Mapa>OTKRIJTE ZADAR</Mapa>
          </Link>
        </WrapText>
        <Mailto>
          <Link href="mailto:retrozadar@gmail.com">retrozadar@gmail.com</Link>
        </Mailto>
      </Wrap>
    </>
  );
}
