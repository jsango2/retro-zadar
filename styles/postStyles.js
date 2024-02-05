import styled from "styled-components";

// import { HeroWrap } from "./style.js"
export const WrapAll = styled.div`
  position: relative;
  width: 100%;
  height: 625px;
  padding-top: 50px;
  z-index: 3;
  overflow: hidden;
  background-color: #151520;
`;

export const Naslov = styled.div`
  position: relative;
  font-style: italic;
  width: 700px;
  font-weight: 800;
  font-size: 72px;
  line-height: 120%;
  margin-top: 0;
  @media only screen and (max-width: 600px) {
    font-size: 36px;
    width: 90%;
  }
`;

export const WrapNaslovButton = styled.div`
  position: absolute;
  width: 868px;
  height: auto;
  bottom: 8%;
  /* left: 16%; */
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media only screen and (max-width: 900px) {
    font-size: 36px;
    width: 90%;
    margin: 0 auto 0 30px;
  }
`;
export const WrapText = styled.div`
  margin: 20px auto 0 auto;
  width: 868px;
  font-size: 21px;
  @media only screen and (max-width: 430px) {
    width: 90%;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgb(0 0 0 / 20%);
`;
export const Text = styled.div`
  font-size: 18px;
  line-height: 142.5%;
  & img {
    margin: 0 auto;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  & p {
    margin: 1.5rem 0;
  }
  @media only screen and (max-width: 430px) {
    font-size: 16px;
  }
`;
