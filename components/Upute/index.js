import { WrapAll, WrapSlider, FirstScreen, Title } from "./style.js";

import { StyledForm } from "./style.js";
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { IoTime } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { BsLayersFill } from "react-icons/bs";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GrFormNext
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GrFormPrevious
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  fade: true,
  infinite: false,
  speed: 10,
  slidesToShow: 1,
  slidesToScroll: 1,
  waitForAnimate: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
function Upute({ lng, lat, toggleModal }) {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setUputeOpen(false);
          // console.log("clicked outside");
        }
      }

      // if ("ontouchstart" in document.documentElement) {
      //     setisTouchDevice(true);
      //   } else {
      //     setisTouchDevice(false);
      //   }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const [mjesto, setMjesto] = useState("");
  const [uputeOpen, setUputeOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <WrapAll ref={wrapperRef} className={` ${uputeOpen ? "open" : "closed"}`}>
      <Title onClick={() => setUputeOpen(!uputeOpen)} open={uputeOpen}>
        {uputeOpen ? "Zatvori upute" : "Upute"}
      </Title>

      <WrapSlider uputeOpen={uputeOpen}>
        <Slider {...settings}>
          <FirstScreen>
            <strong>Retro Zadar</strong> je prilagođen za korištenje na
            računalima te na mobilnim uređajima. <br />
            <strong>Retro Zadar</strong> se sastoji od nekoliko djelova: <br />
            Nakon zumiranja karte pojavljuje se traka sa dijelom fotografija sa
            karte. <br />
            Prelaskom preko fotografije, označiti će se pozicija te fotografije
            na karti.
            <br /> Na fotografiju na traci se može kliknuti za pregled
            fotografije u većem formatu. <br />
            Fotografiju zatvarate klikom na X oznaku na fotografiji (gornji
            desni kut). <br />
            Fotografiju možete otvoriti i zumiranjem karte te klikom na kružić
            koji označava geografsku poziciju fotografije.
          </FirstScreen>
          <FirstScreen>
            Na desnoj strani karte nalazi se klizni odabir intervala godina u
            kojem želite pogledati karte. <br />
            Primjerice da želite vidjeti samo fotografije netom poslije
            bombardiranja grada, odaberite interval od 1943- 1945 godine.
            <br />
            Svaka fotografija ima na sebi naziv lokacije, godinu kada je
            fotografirana (ili procjenu) te autora fotografije. Zbog načina
            prikupljanja fotografija, moguće su pogreške u godini kreiranja
            fotografije te navoda autora. Nastojati ćemo ove pogreške
            ispravljati.
            <br />
          </FirstScreen>
          <FirstScreen>
            U gornjem desnom kutu nalazi se nekoliko ikonica za preciznije
            pretraživanje karte! <br /> <br />
            <IoTimeOutline
              style={{
                display: "inline-block",
                position: "relative",
                bottom: "2px",
                marginRight: "5px",
              }}
            />
            Klikom na ikonicu sata, na karti će vam se prikazati samo
            posljednjih 10 fotografija stavljenih na mapu.
            <br />
            <br />
            <BsLayersFill
              style={{
                display: "inline-block",
                position: "relative",
                bottom: "2px",
                marginRight: "5px",
              }}
            />
            Klikom na ikonicu listova, odaberite vrstu mape: satelitski prikaz
            ili nacrtanu mapu
            {/* <br />
            <br />
            <img src="/swiper.png" width="20" height="20"></img>
            Klikom na ikonu klizača, odaberite samo lokacije koje prikazuju
            prošlost i sadašnjost u jedinstvenom prikazu kojeg možete vidjeti
            samo na <strong>Retro Zadar</strong>! <br />
            <br />
            <br /> */}
            <br />
            <br />
            <br />
            <strong>UŽIVAJTE NA RETRO ZADAR KARTI!</strong>
          </FirstScreen>
        </Slider>
      </WrapSlider>
    </WrapAll>
  );
}

export default Upute;
