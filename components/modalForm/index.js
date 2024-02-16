import { WrapAll, Container, CloseButton, Text } from "./style.js";
// import MarikomercLogo from "../../assets/svg/marikomerc_logo_footer.svg";

import Link from "next/link.js";
import Image from "next/image.js";
import Formular from "./Formular/index.js";
function FormModal({ toggleModal, lngLat, allData }) {
  // const { ref, inView, entry } = useInView({

  //   threshold: 0,
  //   triggerOnce: true,
  // });

  return (
    <WrapAll>
      <CloseButton onClick={() => toggleModal()}>x</CloseButton>
      <Container>
        <Formular
          lng={lngLat.lng}
          lat={lngLat.lat}
          toggleModal={toggleModal}
          allData={allData}
        />
      </Container>
    </WrapAll>
  );
}

export default FormModal;
