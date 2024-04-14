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
    <Wrap>
      <Naslov>RETRO ZADAR</Naslov>
      <Link href="/mapa">
        <Mapa>Mapa</Mapa>
      </Link>
    </Wrap>
  );
}
