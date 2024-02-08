import styled from "styled-components";

// import heroPhoto from "../../images/hero.png"

// import { HeroWrap } from "./style.js"

export const Wrapper = styled.div`
  position: relative;
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border: 1px solid black;
  border-radius: 10px;

  @media only screen and (max-width: 450px) {
    form {
      width: 90%;
    }
    width: 90%;
  }
`;

export const WrapForm = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid grey;
    margin: 5px;
    padding: 5px;
    color: black;
  }
  @media only screen and (max-width: 450px) {
    input {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      border: 1px solid grey;
      margin: 5px 0;
      padding: 5px;
    }
  }
`;
export const Button = styled.button`
  margin: 10px auto;
  cursor: pointer;
  width: 250px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  font-size: 18px;
  background: radial-gradient(
      61.32% 215.39% at 93.04% 39.63%,
      #3ca0c9 0%,
      #1e7ca4 100%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  @media only screen and (max-width: 450px) {
    width: 100%;
  }
`;

export const Title = styled.h3`
  color: darkblue;
  font-size: 15px;
  margin-bottom: 20px;
  @media only screen and (max-width: 420px) {
  }
`;
