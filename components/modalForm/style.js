import styled from "styled-components";

export const WrapAll = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 600px;
  height: 400px;
  border-radius: 20px;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 30px;
  /* overflow: hidden; */
  @media only screen and (max-width: 900px) {
    width: 95%;
    height: auto;
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  @media only screen and (max-width: 770px) {
  }
  @media only screen and (max-width: 574px) {
  }
`;
export const Text = styled.div`
  color: black;
  @media only screen and (max-width: 770px) {
  }
  @media only screen and (max-width: 574px) {
  }
`;
export const CloseButton = styled.div`
  position: absolute;
  z-index: 100;
  right: 20px;
  top: 10px;
  color: black;
  cursor: pointer;
  font-size: 20px;
  @media only screen and (max-width: 770px) {
  }
  @media only screen and (max-width: 574px) {
  }
`;
