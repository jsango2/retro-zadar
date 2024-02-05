import styled from "styled-components";

// import { HeroWrap } from "./style.js"
export const WrapAll = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: auto;
  z-index: 3;
  background-color: #151520;
  @media only screen and (max-width: 600px) {
    padding-bottom: 0;
    height: 615px;
  }
`;

export const WrapForm = styled.div`
  position: relative;

  width: 90%;
  height: 282px;
  margin: 0 auto 0 auto;
  overflow: hidden;
  display: flex;

  @media only screen and (max-width: 900px) {
    height: 371px;
    justify-content: center;
  }
  /* @media only screen and (max-width: 600px) {
    width: 100vw;
    border-radius: 0;
    top: -250px;
  }  */
`;

export const TextNaslovni = styled.h1`
  position: relative;
  font-size: 26px;
  width: 900px;
  text-align: center;
  height: auto;
  margin: 50px auto 60px auto;
  /* display: flex; */
  @media only screen and (max-width: 900px) {
    width: 85%;
    text-align: center;
  }
`;
export const WrapNaslovButton = styled.div`
  position: absolute;
  width: 82%;
  height: auto;
  bottom: 8%;
  left: 10%;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
export const Naslov = styled.h1`
  position: relative;
  font-style: italic;
  width: 700px;
  font-weight: 800;
  font-size: 72px;
  line-height: 120%;
  margin-top: 0;
  @media only screen and (max-width: 600px) {
    font-size: 44px;
  }
  @media only screen and (max-width: 420px) {
    font-size: 37px;
  }
`;
export const Right = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  background: black;
  overflow: hidden;
  @media only screen and (max-width: 900px) {
    width: 34%;
  }
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const Foto = styled.div`
  width: 50%;
  height: 33.4%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
