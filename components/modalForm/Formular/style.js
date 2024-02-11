import styled from "styled-components";

export const WrapAll = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  width: 80%;
  margin: 0 auto;
  padding-top: 40px;
  /* background: ; */
  @media only screen and (max-width: 900px) {
  }
  @media only screen and (max-width: 720px) {
    min-width: unset;
  }
`;

export const StyledForm = styled.form`
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  max-width: 1080px;
  margin: 0 auto;
  flex-direction: column;
  @media only screen and (max-width: 900px) {
  }
`;
export const WrapData = styled.div`
  position: relative;
  @media only screen and (max-width: 720px) {
    width: 95%;
  }
`;
export const WrapUpload = styled.div`
  position: relative;
`;
export const UploadBlock = styled.input`
  position: relative;
  z-index: 5;
  color: black;
`;
export const UploadBlockTopLayer = styled.div`
  position: absolute;
  z-index: 4;
  /* width: 134px;
  height: 134px; */
  display: flex;
  justify-content: center;
  align-items: cente;
  border-radius: 6px;
  border: 1px solid #dbe2ea;
  top: 30px;
  left: 0;

  opacity: 1;
  box-shadow: 0px 4px 8px 0px rgba(44, 39, 56, 0.04);
  cursor: pointer;
`;
export const StyledTextarea = styled.textarea`
  position: relative;
  max-width: 100%;
  width: 100%;
`;
export const DoubleRow = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const SmallBlock = styled.div`
  position: relative;
  width: 45%;
  @media only screen and (max-width: 900px) {
    width: 90%;
  }
`;
export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  color: #1c2640;
  width: auto;
  input {
    margin-right: 5px;
  }
`;

export const StyledInput = styled.input`
  width: 300px !important;
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
  @media only screen and (max-width: 900px) {
    width: 90% !important;
  }
`;

export const StyledButton = styled.button`
  color: white;
  padding: 10px 40px;
  margin-top: 30px;
  border: none;

  cursor: pointer;
  display: block;
  border-radius: 4px;
  background: #4299c8;
  color: #fff;

  text-align: center;
  font-family: Gilroy;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 142.5%;
  transition: all 0.3s ease-in-out;

  /* opacity: ${(props) => (!props.enabled ? 0.5 : 1)}; */
  &:hover {
    background: var(--color-boja-tamnoplava-ocjena);
  }
  &:active {
    background: #4299c8;
    border: 1px solid #93f9ff;
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
export const StyledButtonMob = styled.button`
  color: white;
  padding: 10px 40px;
  margin-top: 30px;
  border: none;

  cursor: pointer;
  display: block;
  border-radius: 4px;
  background: #4299c8;
  color: #fff;
  width: 100%;
  text-align: center;
  font-family: Gilroy;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 142.5%;
  /* opacity: ${(props) => (!props.enabled ? 0.5 : 1)}; */
  @media only screen and (min-width: 900px) {
    display: none;
  }
`;
export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`;
