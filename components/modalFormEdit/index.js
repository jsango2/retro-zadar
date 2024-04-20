import { WrapAll, Container, CloseButton, Text } from "./style.js";
// import MarikomercLogo from "../../assets/svg/marikomerc_logo_footer.svg";

import Link from "next/link.js";
import Image from "next/image.js";
import Formular from "./Formular/index.js";
function EditFormModal({ toggleModal, id, data, allData }) {
  // const { ref, inView, entry } = useInView({

  //   threshold: 0,
  //   triggerOnce: true,
  // });
  console.log("DATA:", data);
  console.log("ID:", id);
  return (
    <WrapAll>
      <CloseButton onClick={() => toggleModal()}>x</CloseButton>
      <Container>
        <Formular
          toggleEditModal={toggleModal}
          id={id}
          data={data}
          allData={allData}
        />
      </Container>
    </WrapAll>
  );
}

export default EditFormModal;
