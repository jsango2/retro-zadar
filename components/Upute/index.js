import { WrapAll, WrapSlider, FirstScreen, Title } from "./style.js";

import { StyledForm } from "./style.js";
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

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
  infinite: true,
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
          console.log("clicked outside");
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
        Upute za korištenje
      </Title>

      <WrapSlider uputeOpen={uputeOpen}>
        <Slider {...settings}>
          <FirstScreen>
            {" "}
            <strong>Dragi ljubitelji starih fotografija Zadra!</strong>
            <br />
            <br />
            Dobrodošli na <strong>Retro Zadar</strong>, stranicu posvećenu Zadru
            i svim onim ljepotama koje su vezane uz naš prekrasan grad! Ovaj
            projekt je izradila i održava grupa entuzijasta, kojima je želja da
            se ne zaboravi povijest grada Zadra kroz fotografije koje su
            izradili i prikupljali vrsni fotografi sa ovog područja. Projekt
            nije komercijalan i to nikada neće biti. Sve fotografije na ovoj
            karti prikupljene su preko socijalnih mreža i ostalih izvora na
            internetu. <br />
            Zahvaljujemo se svima koji su se potrudili da se ove fotografije ne
            zaborave. Nove fotografije grada izradili su autori ove stranice.
          </FirstScreen>
          <FirstScreen>
            {" "}
            Retro Zadar se sastoji od nekoliko djelova: <br />
            Nakon zumiranja karte pojavljuje se traka sa dijelom fotografija sa
            karte. Prelaskom preko fotografije, označiti će se pozicija te
            fotografije na karti. Na fotografiju na traci se može kliknuti za
            pregled fotografije u većem formatu. Fotografiju zatvarate klikom na
            X oznaku na fotografiji (gornji desni kut). Fotografiju možete
            otvoriti i zumiranjem karte te klikom na kružić koji označava
            geografsku poziciju fotografije. Na desnoj strani karte nalazi se
            klizni odabir intervala godina u kojem želite pogledati karte.
            Primjerice da želite vidjeti samo fotografije netom poslije
            bombardiranja grada, odaberite interval od 1943- 1945 godine.
            <br />
            Poneke fotografije na traci za pregled imaju žutu oznaku
            <img src="/imgIcon.png" width="20" height="20"></img>. Ove
            fotografije prikazuju i današnji izgled na uslikanoj poziciji
            preklapanjem dviju fotografija. Pomicanjem klizača lijevo-desno,
            usporedite prošlost i sadašnjost Zadra!
          </FirstScreen>
        </Slider>
      </WrapSlider>
    </WrapAll>
  );
}

export default Upute;
