import React, { useState, useEffect, useRef } from "react";
import splitbee from "@splitbee/web";
// import "../../i18next";
// import { useTranslation } from "react-i18next";
// import { GoInfo } from "react-icons/go";
// import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp"
import mapboxgl from "!mapbox-gl";
import Sliderx from "@mui/material/Slider";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import styled from "styled-components";
import uuid from "react-uuid";
// import firebase from "gatsby-plugin-firebase";
import { db, auth } from "../components/firebase/firebase";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
// import { Link } from "gatsby";
import { BsLayersFill } from "react-icons/bs";
import { GrSplit } from "react-icons/gr";
import useWindowSize from "../components/helper/usewindowsize";
import SliderGodina from "../components/SliderGodina";
import Slikejson from "../components/test.json";
import FormModal from "../components/modalForm";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormNext, GrFormUpload } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { FaImages } from "react-icons/fa";
import EditFormModal from "../components/modalFormEdit";
import Upute from "../components/Upute";
import { dataBackup } from "../dataBackup";
import Script from "next/script";
import { IoTimeOutline } from "react-icons/io5";
import { IoTime } from "react-icons/io5";
import { IoBookSharp } from "react-icons/io5";
import Head from "next/head";
// import Header from "./../components/header";
// import i18next from "i18next";
// import SEO from "../components/seo";
// import Lottie from "lottie-react";
// import animation1152Hr from "../animations/popoutrazglednice/popoutrazgledniceHr";
// import InfoBlock from "../components/InfoBlock";
// import { useOnClickOutside } from "../components/useClickOutside";
// import animation1152En from "../animations/popoutrazglednice/poputrazgledniceEn";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Naslov = styled.div`
  position: fixed;
  left: 273px;
  top: 23px;
  z-index: 2;
  color: ${(props) => (props.mapStyle ? "#3f230f" : "white")};

  font-size: 55px;
  font-family: "Garamond";
  /* font-style: bold;
  font-weight: 700; */
  /* text-shadow: 0px 2px 11px #0000006e; */
  @media screen and (max-width: 850px) {
    left: 10px;
    top: 25px;

    font-size: 24px;
  }
`;
const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #0000007a;
  z-index: 21;
  @media screen and (max-width: 850px) {
  }
`;
const FeaturedModal = styled.div`
  position: fixed;
  top: 66px;
  right: 117px;
  width: 300px;
  height: 100px;
  background-color: #0000007a;
  z-index: 21;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
  @media screen and (max-width: 600px) {
    top: 80px;
    right: 48px;
  }
`;
export const WrapSlider = styled.div`
  position: fixed;
  z-index: 13;
  width: 600px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.firstScreen {
    transition: opacity 1s ease-in-out;
    opacity: 1;
  }
  &.noFirstScreen {
    transition: opacity 0.2s ease-out;
    opacity: 0;
  }

  @media only screen and (max-width: 600px) {
    width: 95vw;
  }
  @media only screen and (max-width: 420px) {
  }
`;
export const CloseSlider = styled.div`
  position: absolute;
  z-index: 12;
  width: 20px;
  height: 20px;
  top: 20px;
  right: 20px;
  color: black;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    top: 10px;
    right: 10px;
  }
  @media only screen and (max-width: 420px) {
  }
`;
export const Bliske = styled.div`
  position: absolute;
  display: flex;
  z-index: 23;
  width: 80%;
  height: 100px;
  bottom: 20px;
  /* right: 20px; */
  color: black;
  font-weight: 500;
  font-size: 20px;
  background-color: red;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    top: 10px;
    right: 10px;
  }
  @media only screen and (max-width: 420px) {
  }
`;
export const Featured = styled.div`
  position: fixed;
  z-index: 19;
  width: 120px;
  height: 33px;
  right: 17px;
  top: 84px;

  background-color: ${(props) =>
    !props.checked ? "rgb(255 255 255)" : "#5e5b5b"};

  border: 2px solid #dbdcda;
  border-radius: 4px;
  color: ${(props) => (props.checked ? "rgb(255 255 255)" : "#5e5b5b;")};
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* background-image: url("/swiper.png");
  background-size: contain; */
  cursor: pointer;
  font-weight: 500;

  label {
    margin-right: 5px;
    font-weight: 500;
    color: ${(props) => (props.mapStyle ? "#5e5b5b" : "white")};
  }
  input {
    accent-color: #5b5b5b;
  }

  @media only screen and (max-width: 600px) {
    left: unset;
    top: 106px;
    right: 8px;
    width: 90px;
  }
  @media only screen and (max-width: 420px) {
  }
`;
export const Latest = styled.div`
  position: fixed;
  z-index: 20;
  width: 120px;
  height: 33px;
  right: 17px;
  top: 10px;

  background-color: ${(props) =>
    !props.checked ? "rgb(255 255 255)" : "#5e5b5b"};

  border: 2px solid #dbdcda;
  border-radius: 4px;
  color: ${(props) => (props.checked ? "rgb(255 255 255)" : "#5e5b5b;")};
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* background-image: url("/swiper.png");
  background-size: contain; */
  cursor: pointer;
  font-weight: 500;
  font-family: "Garamond";
  label {
    margin-right: 5px;
    font-weight: 600;
    color: ${(props) => (props.mapStyle ? "#5e5b5b" : "white")};
  }
  input {
    accent-color: #5b5b5b;
  }

  @media only screen and (max-width: 600px) {
    left: unset;
    top: 28px;
    right: 8px;
    width: 90px;
  }
  @media only screen and (max-width: 420px) {
  }
`;
export const WrapLottie = styled.div`
  position: absolute;
  z-index: 23;
  height: auto;
  width: auto;
  left: 58%;
  top: 45%;
  transform: translate(-50%, 0%);
  /* background: ; */
  @media only screen and (max-width: 900px) {
  }
  @media only screen and (max-width: 720px) {
  }
`;
const PodNaslov = styled.div`
  position: fixed;
  left: 275px;
  top: 91px;
  z-index: 2;
  color: ${(props) => (props.mapStyle ? "#3f230f" : "white")};

  font-size: 24px;
  font-family: "Garamond";
  font-style: bold;
  font-weight: 700;
  /* text-shadow: 0px 2px 11px #0000006e; */
  @media screen and (max-width: 850px) {
    left: 10px;

    top: 55px;

    font-size: 18px;
  }
`;
const IntroTitle = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;

  z-index: 100;
  /* color: ${(props) => (props.mapStyle ? "#5e5b5b" : "white")}; */

  font-size: 167px;
  line-height: 110%;
  font-family: "Garamond";
  font-style: bold;
  font-weight: 700;
  text-shadow: 0px 2px 11px #0000006e;
  text-align: center;
  @media screen and (max-width: 850px) {
    font-size: 75px;
  }
`;
const PodNaslov2 = styled.div`
  position: fixed;
  left: 275px;
  top: 124px;
  z-index: 2;
  color: ${(props) => (props.mapStyle ? "#3f230f" : "white")};

  font-size: 18px;
  font-family: "Garamond";
  font-style: bold;
  font-weight: 700;
  /* text-shadow: 0px 2px 11px #0000006e; */
  @media screen and (max-width: 850px) {
    left: 10px;

    top: 80px;
    font-size: 12px;
  }
`;

const FirstScreen = styled.p`
  position: relative;

  z-index: 1000;
  color: black;
  font-size: 16px;
  font-family: "Garamond";
  font-weight: 400;
  width: 600px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #9b9b9b;

  padding: 70px;
  text-align: center;
  display: inline;

  img {
    display: inline-block;
    margin: 0 3px;
  }
  @media screen and (max-width: 630px) {
    font-size: 14px;

    padding: 70px 20px 0 20px;
  }
`;

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

function Mapa({ data }) {
  splitbee.init();
  //   const { t } = useTranslation();
  const size = useWindowSize();
  const router = useRouter();
  const [lng, setLng] = useState(15.2264);
  const [lat, setLat] = useState(44.1137);
  const [lngLat, setLngLat] = useState(null);
  const [zoom, setZoom] = useState(13.7);
  const [hasPoints, setHasPoints] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);
  const [isTouchDevice, setisTouchDevice] = useState(false);
  const [wasVisited, setWasVisited] = useState(false);

  const [featuresArray, setFeaturesArray] = useState([]);
  const [allDataFromDB, setAllDataFromDB] = useState([]);
  const [arrayBliskeFotke, setArrayBliskeFotke] = useState([]);
  const [featuresArr, setFeaturesArr] = useState([]);
  const [firstScreen, setFirstScreen] = useState(false);
  const [firstScreen2, setFirstScreen2] = useState(false);
  const [idKliknuteFotke, setIdKliknuteFotke] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [featuresKliknuteFotke, setFeaturesKliknuteFotke] = useState([]);
  const [popupOn, setPopupOn] = useState(false);
  const [mapStyle, setMapStyle] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [logedIn, setlogedIn] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isFeaturedHovering, setIsFeaturedHovering] = useState(false);
  const [isLatestHovering, setIsLatestHovering] = useState(false);
  const [isMapTogglerHovering, setIsMapTogglerHovering] = useState(false);
  const [isLatest, setIsLatest] = useState(false);
  const [isPointerInPopup, setIsPointerInPopup] = useState(false);

  const [geoData, setGeoData] = useState([]);
  const [geoData2, setGeoData2] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [value, setValue] = React.useState([1749, 1985]);
  useEffect(() => {
    setTimeout(() => {
      setFirstScreen(true);
      setFirstScreen2(true);
    }, 3000);
  }, []);

  const bounds = {
    n: 44.1597,
    s: 44.0797,
    e: 15.2924,
    w: 15.1524,
  };
  const maxBounds = [
    [bounds.w, bounds.s],
    [bounds.e, bounds.n],
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${Number(value[0])} godina do ${Number(value[1])} `;
  }

  //   const [lang, setLang] = useState(i18next.language);
  // dataBackup.forEach((data) => (data.id = uuid()));
  // console.log("JELI POINTER U SLICI?", isPointerInPopup);
  const fetchPost = async () => {
    // console.log("FETCHED FROM FIREBASE");
    // const docRef = doc(db, "retroData", "RJHT2JQsp8yK52ztOn1z");
    const docRef = doc(db, "retroData5", "test");
    const docSnap = await getDoc(docRef);

    // ako zelim ograniciti broj slika na mapi::
    // const allData = docSnap.data().allData.slice(200, 300);
    const allData = docSnap.data().allData;
    // console.log("ALL DATA:", allData);
    // console.log(allData);
    const epochTime = 1708603609636;
    const date = new Date(epochTime);
    const currentTimeInMiliSeconds = Date.now();
    const lessThen30days = allData.filter(
      (item) => currentTimeInMiliSeconds - item.timestamp > 879200000
    );
    // console.log("LESS", lessThen30days);
    let lastItemAdded = allData[allData.length - 1];
    let lastUpdateDate = new Date(lastItemAdded.timestamp);
    setLastUpdate(lastUpdateDate.toLocaleDateString("en-US"));
    setAllDataFromDB(allData);
    const dataWithDetails = allData.map((doc) => ({
      type: "Feature",
      properties: {
        datum_uploada: parseInt(doc.DateCreated),
        image_url_thumb: doc.Photo50px,
        image_url_1000px: doc.Photo1000px,
        image_url_200px: doc.Photo200px,
        newPhoto: doc.newPhoto,
        title_naslov: doc.Title,
        longitude: doc.GPSLongitude,
        latitude: doc.GPSLatitude,
        procjenaGodine: doc.procjenaGodine,
        autor: doc.autor,
        fotoLayout: doc.fotoLayout,
        timeStamp: doc.timestamp,

        id: doc.id,
        icon: {
          // iconUrl: doc.data().Photo50px,
          iconSize: [50, 50], // size of the icon
          iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
          className: "dot",
        },
      },
      geometry: {
        type: "Point",
        coordinates: [doc.GPSLongitude, doc.GPSLatitude],
      },
      id: doc.id,
    }));
    setGeoData({
      type: "FeatureCollection",
      features: dataWithDetails,
    });
  };
  // const fetchPost = async () => {
  //   console.log("FETCHED FROM FIREBASE");
  //   await getDocs(collection(db, "cities")).then((querySnapshot) => {
  //     const newData = querySnapshot.docs.map((doc) => doc.data());
  //     setGeoData(newData);
  //   });
  // };
  // Formula za udaljenost neke točke od zadane lng lat

  // useEffect(() => {
  //   const bliskeFotke = featuresArray.filter((item) => {
  //     const lat2 = item.properties.latitude;
  //     const lon2 = item.properties.longitude;
  //     const R = 6371e3;
  //     const φ1 = (featuresKliknuteFotke.latitude * Math.PI) / 180; // φ, λ in radians
  //     const φ2 = (lat2 * Math.PI) / 180;
  //     const Δφ = ((lat2 - featuresKliknuteFotke.latitude) * Math.PI) / 180;
  //     const Δλ = ((lon2 - featuresKliknuteFotke.longitude) * Math.PI) / 180;
  //     const a =
  //       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
  //       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //     const d = (R * c).toFixed(1); // in metres
  //     if (d < 40) return d;
  //   });
  //   console.log("Bliske", bliskeFotke);
  //   setArrayBliskeFotke(bliskeFotke);
  // }, [featuresKliknuteFotke]);

  useEffect(() => {
    fetchPost();
    console.log("auth");
    auth.onAuthStateChanged((user) => {
      if (user) {
        setlogedIn(true);
        console.log("OnAuthStateChanged: Logged in");
      } else {
        setlogedIn(false);
        console.log("OnAuthStateChanged: Logged out");
      }
    });

    if ("ontouchstart" in document.documentElement) {
      setisTouchDevice(true);
    } else {
      setisTouchDevice(false);
    }
  }, [isModalOpen]);

  // const Render = () => {
  //   return <div style={{ color: "black" }}>Jure</div>;
  // };

  //---
  useEffect(() => {
    if (geoData.length !== 0) {
      var filtrirano = geoData.features.filter(
        (razglednica) =>
          razglednica.properties.datum_uploada >= value[0] &&
          razglednica.properties.datum_uploada <= value[1] &&
          razglednica.properties.newPhoto
      );
    }
    if (isChecked && !isLatest) {
      var filterByOverlay = filtrirano.filter(
        (razglednica) => razglednica.properties.newPhoto
      );
      var objectFiltrirano = {
        type: "FeatureCollection",
        features: filterByOverlay,
      };
    } else {
      var objectFiltrirano = {
        type: "FeatureCollection",
        features: filtrirano,
      };
    }
    // iznad nafiltrirano dodaj .slice(-50) za npr samo zadnjih 50 prikazati
    if (isLatest && !isChecked) {
      // const currentTimeInMiliSeconds = Date.now();
      // var filterByLatest = filtrirano.filter(
      //   (razglednica) =>
      //     currentTimeInMiliSeconds - razglednica.properties.timeStamp <
      //     509200000
      // );
      let filterByLatest = filtrirano.slice(-10);

      var objectFiltrirano = {
        type: "FeatureCollection",
        features: filterByLatest,
      };
    }
    if (isLatest && isChecked) {
      const currentTimeInMiliSeconds = Date.now();

      var filterByOverlay = filtrirano.filter(
        (razglednica) => razglednica.properties.newPhoto
      );
      // var filterByLatest = filterByOverlay.filter(
      //   (razglednica) =>
      //     currentTimeInMiliSeconds - razglednica.properties.timeStamp <
      //     509200000
      // );
      let filterByLatest = filtrirano.slice(-10);

      var objectFiltrirano = {
        type: "FeatureCollection",
        features: filterByLatest,
      };
    }

    setGeoData2(objectFiltrirano);
  }, [geoData, value, isChecked, isLatest]);
  // "mapbox://styles/jsango2/cjh3aevme24j82rs46qo4x14o"
  // -----
  // console.log("GEODATA2", geoData2);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: mapStyle
        ? "mapbox://styles/jsango2/clsyekr3b00ck01me3jvc2fz0"
        : "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      pitch: 40,
      zoom: zoom,
      minZoom: 13, // note the camel-case
      maxZoom: 21,
      maxBounds: maxBounds,
    });
    const popup = new mapboxgl.Popup({
      closeButton: false,
    });
    const popup2 = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,

      anchor: "center",
      className: "moj-popupMapbox",
      maxWidth: "100%",
    });

    map.on("moveend", () => {
      setLng(map.getCenter().lng.toFixed(15));
      setLat(map.getCenter().lat.toFixed(15));
      setZoom(map.getZoom().toFixed(2));
    });
    map.on("idle", function () {
      map.resize();
    });

    map.on("load", function () {
      map.loadImage(
        mapStyle ? "/lightPoint.png" : "/darkPoint.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("cat", image);
        }
      );

      // map.resize();

      // const filterEl = document.getElementById("feature-filter");
      const listingEl = document.getElementById("feature-listing");

      map.on("moveend", () => {
        const features = map.queryRenderedFeatures({ layers: ["city"] });
        // console.log(features);
        // const filteredFeaturesByOverlay = features.filter(
        //   (feature) => feature.properties.newPhoto === ""
        // );
        // console.log("features", filteredFeaturesByOverlay);
        setFeaturesArray(features);
        // if (features) {
        //   const uniqueFeatures = getUniqueFeatures(features, "iata_code");
        // Populate features for the listing overlay.

        RenderListings(features.slice(0, 10));

        function RenderListings(features) {
          const featuresWithoutClusters = features.filter(
            (feature) => feature.properties.datum_uploada
          );
          // funkcija za dodavanje popupa sa thumbnailom kad je zoom veci od 19

          const empty = document.createElement("p");
          // Clear any existing listings
          listingEl.innerHTML = "";

          if (features.length) {
            for (const feature of featuresWithoutClusters) {
              const itemLink = document.createElement("figure");
              itemLink.id = "imageDiv";
              const p = document.createElement("div");

              // var foo = document.getElementById("imageDiv");
              // itemLink.appendChild(node);

              const label = `${feature.properties.title_naslov},${feature.properties.datum_uploada}  `;

              itemLink.appendChild(p);

              p.textContent = label;
              var DOM_img = document.createElement("img");
              if (feature.properties.newPhoto) {
                var hasNewPhotoDiv = document.createElement("div");
                hasNewPhotoDiv.id = "hasNewPhotoDiv";
                itemLink.appendChild(hasNewPhotoDiv);
              }
              DOM_img.src = feature.properties.image_url_1000px;
              DOM_img.id = "imgComp";
              DOM_img.setAttribute("loading", "lazy");
              itemLink.appendChild(DOM_img);
              // itemLink.href = feature.properties.wikipedia;
              // itemLink.target = "_blank";
              // itemLink.style.backgroundImage = `url(${feature.properties.image_url})`;

              itemLink.addEventListener("mouseover", () => {
                // Highlight corresponding feature on the map
                popup
                  .setLngLat([
                    feature.properties.longitude,
                    feature.properties.latitude,
                  ])
                  .setText(label)
                  .setHTML(
                    `<div >
                    <div 
                    class=${feature.properties.newPhoto ? "" : ""}
                    >

                            </div>
                            <div  class=${
                              feature.properties.newPhoto
                                ? "imgThumbNew"
                                : "imgThumb"
                            }><img class="imgPopup" src=${
                      feature.properties.image_url_1000px
                    } ></img></div>
                          </div>
          
                          `
                  )

                  .addTo(map);
              });
              itemLink.addEventListener("mouseleave", () => {
                // Highlight corresponding feature on the map
                popup.remove();
              });

              itemLink.addEventListener("click", (e) => {
                var coordinates = feature.geometry.coordinates.slice();
                setIdKliknuteFotke(feature.properties.id);
                setFeaturesKliknuteFotke(feature.properties);

                setPopupOn(true);

                if (feature.properties.newPhoto) {
                  popup2
                    .setLngLat(feature.geometry.coordinates)
                    .setText(feature.properties.title_naslov)
                    .setHTML(
                      `<div class='${
                        feature.properties.fotoLayout === "portrait"
                          ? "revealPortrait revealPortraitAnimation"
                          : "reveal revealAnimation"
                      }'>
                     <img id="imagePopup" class="swipeFinger shrinkSwiper" src="/swiperWhite.svg" ></img>
                               <div class='popupTitle'>
                                  <span style="font-weight: bold">${
                                    feature.properties.title_naslov
                                  },</span>
                                  ${
                                    feature.properties.procjenaGodine &&
                                    feature.properties.procjenaGodine === true
                                      ? "oko "
                                      : ""
                                  }
                                  ${feature.properties.datum_uploada}.g
                                
                                </div>
                         <img class="img3" src=${
                           feature.properties.image_url_200px
                         } ></img>
                           <img id="img4" class="img4" src=${
                             feature.properties.newPhoto
                           } ></img>
                           <div id="activator" class="activator"></div>
                           <div id="divider" class="divider"></div>
                           <div class="fotoAutor">Autor: ${
                             (feature.properties.autor &&
                               feature.properties.autor !== "") ||
                             undefined
                               ? feature.properties.autor
                               : "Nepoznat"
                           }</div>
                      </div>
                      `
                    )
                    .addTo(map);
                  if (size.width > 450) {
                    document
                      .getElementById("activator")
                      .addEventListener(
                        isTouchDevice ? "touchmove" : "mousemove",
                        (event) => {
                          if (event !== null) {
                            setIsPointerInPopup(true);
                          } else {
                            setIsPointerInPopup(false);
                          }
                          const divider = document.getElementById("divider");

                          divider.style.left = event.offsetX + "px";
                          if (feature.properties.fotoLayout === "portrait") {
                            event.target.previousElementSibling.style.clip =
                              "rect(0px, " + event.offsetX + "px,720px,0px)";
                          } else {
                            event.target.previousElementSibling.style.clip =
                              "rect(0px, " + event.offsetX + "px,450px,0px)";
                          }
                        }
                      );
                  } else {
                    document
                      .getElementById("activator")
                      .addEventListener(
                        isTouchDevice ? "touchmove" : "mousemove",
                        (event) => {
                          const divider = document.getElementById("divider");

                          if (event.touches) {
                            divider.style.left =
                              event.touches[0].clientX + "px";
                            event.target.previousElementSibling.style.clip =
                              "rect(0px, " +
                              event.touches[0].clientX +
                              "px,450px,0px)";
                          } else {
                            divider.style.left = event.clientX + "px";
                            event.target.previousElementSibling.style.clip =
                              "rect(0px, " + event.clientX + "px,450px,0px)";
                          }
                        }
                      );
                  }
                } else {
                  popup2
                    .setLngLat(feature.geometry.coordinates)
                    .setText(feature.properties.title_naslov)
                    .setHTML(
                      `<div class='wrapPopup'>
                        <div class='popupTitle'>
                          <span style="font-weight: bold">${
                            feature.properties.title_naslov
                          },</span>
                          ${
                            feature.properties.procjenaGodine &&
                            feature.properties.procjenaGodine === true
                              ? "oko "
                              : ""
                          }
                           ${feature.properties.datum_uploada}.g
                        
                        </div>
                        <div  class="imgTest" ><img src=${
                          feature.properties.image_url_200px
                        } ></img></div>

                        <div class="fotoAutor">Autor: ${
                          (feature.properties.autor &&
                            feature.properties.autor !== "") ||
                          undefined
                            ? feature.properties.autor
                            : "Nepoznat"
                        }</div>

                      </div>
                      `
                    )
                    .addTo(map);
                }
              });

              listingEl.appendChild(itemLink);
            }
          }
          // if (features.length === 0) {
          //   setNemaFotografije(true);
          // } else {
          //   setNemaFotografije(false);
          // }
        }

        // airports = features;
        // }
      });
      popup2.on("close", function () {
        setIsPointerInPopup(false);
      });

      map.addSource("cities", {
        type: "geojson",
        data: geoData2,
        cluster: true,
        clusterMaxZoom: 11, // Max zoom to cluster points on
        clusterRadius: 42, // Radius of each cluster when clustering points (defaults to 50)
        clusterMinPoints: 2,
      });

      //DODAVANJE POSTCARD IKONA:
      // map.addControl(
      //   new mapboxgl.GeolocateControl({
      //     positionOptions: {
      //       enableHighAccuracy: true,
      //     },
      //     // When active the map will receive updates to the device's location as it changes.
      //     trackUserLocation: true,
      //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
      //     showUserHeading: true,
      //     showAccuracyCircle: false,
      //   })
      // );

      map.addLayer({
        id: "city",
        source: "cities",
        type: "symbol",
        // minzoom: 8,
        // maxzoom: 12,
        // paint: {
        //   "circle-color": "#242323",
        //   "circle-radius": 6,
        //   "circle-stroke-width": 2,
        //   "circle-stroke-color": "#ffffff",
        // },
        layout: {
          "icon-image": "cat",
          "icon-size": ["interpolate", ["linear"], ["zoom"], 12, 0.1, 17, 0.29],
          "icon-padding": 0,
          "icon-allow-overlap": true,
          //   "icon-translate": [0, 0],
          //   "icon-halo-blur": 0.5,
        },
      });

      map.on("mouseleave", "city", () => {
        map.getCanvas().style.cursor = "";
        // popup.remove();
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "cities",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#202020",
            8,
            "#202020",
            20,
            "#202020",
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 20, 40],
        },
      });
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "cities",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#e6d2a9",
        },
      });

      map.on("click", "clusters", function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        var clusterId = features[0].properties.cluster_id;
        map
          .getSource("cities")
          .getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });
      // map.on("idle", function () {
      //   setPopupPoster(true);
      // });

      // map.on("load", function () {
      //   var features = map.queryRenderedFeatures({ layers: ["city"] });
      //   setFeaturesArr(features);
      // });
      map.on("dblclick", (e) => {
        if (logedIn) {
          setIsModalOpen(true);
          setLngLat(e.lngLat.wrap());
        }
      });
      map.doubleClickZoom.disable();
      // map.on("click", function (e) {
      //   if (e.defaultPrevented === false) {
      //     setPopupOn(false);
      //   }
      // });

      map.on("click", "city", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var feature = e.features[0];
        let timestamp = feature.properties.timeStamp;

        let now = Date.now();
        const razlika = now - timestamp;
        setIdKliknuteFotke(e.features[0].properties.id);
        setFeaturesKliknuteFotke(e.features[0].properties);
        // if (e.features[0].properties.newPhoto) {
        //   setHasNewPhoto(true);
        // } else {
        //   setHasNewPhoto(false);
        // }

        setPopupOn(true);
        // setShow(false);
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        if (feature.properties.newPhoto) {
          popup2
            .setLngLat(feature.geometry.coordinates)
            .setText(feature.properties.title_naslov)
            .setHTML(
              `<div class='${
                feature.properties.fotoLayout === "portrait"
                  ? "revealPortrait revealPortraitAnimation"
                  : "reveal revealAnimation"
              }'>
              <div class='${
                feature.properties.fotoLayout === "portrait"
                  ? "revealPortrait revealPortraitAnimation"
                  : "reveal revealAnimation"
              }'   ><img id="imagePopup" class="swipeFinger shrinkSwiper" src="/swiperWhite.svg" ></img>

                       <div class='popupTitle'>
                          <span style="font-weight: bold">${
                            feature.properties.title_naslov
                          },</span>
                          ${
                            feature.properties.procjenaGodine &&
                            feature.properties.procjenaGodine === true
                              ? "oko "
                              : ""
                          }
                          ${feature.properties.datum_uploada}.g
                        
                        </div>
                 <img class="img3" src=${
                   feature.properties.image_url_200px
                 } ></img>
                   <img id="img4" class="img4" src=${
                     feature.properties.newPhoto
                   } ></img>
                   <div id="activator" class="activator"></div>
                   <div id="divider" class="divider"></div>
                   <div class="fotoAutor">Autor: ${
                     (feature.properties.autor &&
                       feature.properties.autor !== "") ||
                     undefined
                       ? feature.properties.autor
                       : "Nepoznat"
                   }</div>
          
              </div>

              `
            )

            .addTo(map);
          if (size.width > 450) {
            document
              .getElementById("activator")
              .addEventListener(
                isTouchDevice ? "touchmove" : "mousemove",
                (event) => {
                  const divider = document.getElementById("divider");
                  divider.style.left = event.offsetX + "px";
                  if (feature.properties.fotoLayout === "portrait") {
                    event.target.previousElementSibling.style.clip =
                      "rect(0px, " + event.offsetX + "px,720px,0px)";
                  } else {
                    event.target.previousElementSibling.style.clip =
                      "rect(0px, " + event.offsetX + "px,450px,0px)";
                  }
                }
              );
          } else {
            document
              .getElementById("activator")
              .addEventListener(
                isTouchDevice ? "touchmove" : "mousemove",
                (event) => {
                  const divider = document.getElementById("divider");

                  if (event.touches) {
                    divider.style.left = event.touches[0].clientX + "px";
                    event.target.previousElementSibling.style.clip =
                      "rect(0px, " + event.touches[0].clientX + "px,450px,0px)";
                  } else {
                    divider.style.left = event.offsetX + "px";

                    event.target.previousElementSibling.style.clip =
                      "rect(0px, " + event.offsetX + "px,450px,0px)";
                  }
                }
              );
          }
        } else {
          popup2
            .setLngLat(feature.geometry.coordinates)
            .setText(feature.properties.title_naslov)
            .setHTML(
              `<div class='wrapPopup'>

                <div class='popupTitle'>
                  <span style="font-weight: bold">${
                    feature.properties.title_naslov
                  },</span>
                  ${
                    feature.properties.procjenaGodine &&
                    feature.properties.procjenaGodine === true
                      ? "oko "
                      : ""
                  }
                   ${feature.properties.datum_uploada}.g
                </div>
                <div  class="imgTest" ><img src=${
                  feature.properties.image_url_200px
                } ></img></div>
          
                <div class="fotoAutor">Autor: ${
                  (feature.properties.autor &&
                    feature.properties.autor !== "") ||
                  undefined
                    ? feature.properties.autor
                    : "Nepoznat"
                }</div>
              </div>

              `
            )

            .addTo(map);
        }
        document
          .getElementById("overlay")
          .addEventListener("click", (event) => {
            setPopupOn(false);
            popup2.remove();
          });
      });

      popup2.on("close", () => {
        setIdKliknuteFotke(null);
        setFeaturesKliknuteFotke([]);
        setPopupOn(false);

        // document.getElementById("overlay").classList.remove("overlay");
      });

      map.on("mouseleave", "city", function () {
        map.getCanvas().style.cursor = "";
        // popup.remove()
      });
      map.on("mouseenter", "city", function () {
        map.getCanvas().style.cursor = "pointer";
        // popup.remove();
      });
      // map.flyTo({
      //   // These options control the ending camera position: centered at
      //   // the target, at zoom level 9, and north up.
      //   center: [lng, lat],
      //   zoom: size.width < 750 ? 5.9 : 13.2,
      //   bearing: 0,

      //   // These options control the flight curve, making it move
      //   // slowly and zoom out almost completely before starting
      //   // to pan.
      //   speed: 0.3, // make the flying slow
      //   curve: 1, // change the speed at which it zooms out

      //   // This can be any easing function: it takes a number between
      //   // 0 and 1 and returns another number between 0 and 1.
      //   easing: function (t) {
      //     return 1 - Math.pow(1 - t, 5);
      //   },

      //   // this animation is considered essential with respect to prefers-reduced-motion
      //   essential: true,
      // });
      // Call this function on initialization
      // passing an empty array to render an empty state
      //   renderListings([]);
    });

    // Call this function on initialization
    // passing an empty array to render an empty state
    // renderListings([])

    // Initialize the map

    // map.on("sourcedata", function (e) {
    //   setLoader(e.isSourceLoaded);
    //   // console.log(e)
    // });

    return () => map.remove();
  }, [geoData2, mapStyle]);

  const toggleModal = () => {
    setIsModalOpen(false);
    setHasPoints(true);
  };
  const toggleEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleClick = () => {
    console.log("Clicked photo");
  };
  const handleLogOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("odlogiralo");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleCloseFirstScreen = () => {
    setFirstScreen2(false);

    setTimeout(() => {
      setFirstScreen(false);
    }, 1000);
  };
  const handleDelete = async (id) => {
    // const objIndex = allDataFromDB.findIndex((obj) => obj.id == id);
    // console.log("DELETING", id);
    // console.log("objIndex", objIndex);
    // console.log(allDataFromDB[objIndex].Title);
    const allData = allDataFromDB.filter((item) => item.id !== id);
    console.log("ARRAY WITHOUT DELETED", allData);
    // const docRef = doc(db, "retroData", "RJHT2JQsp8yK52ztOn1z");
    const docRef = doc(db, "retroData5", "test");
    setIsDeleting(true);

    await setDoc(docRef, { allData });
    setTimeout(() => {
      setIsDeleting(false);
      setDeleted(true);
    }, 1500);

    setTimeout(() => {
      setDeleted(false);
    }, 3000);
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "cities", id));
      setDeleted(true);
      setIsDeleting(false);

      setTimeout(() => {
        setDeleted(false);
      }, 5000);
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleEdit = async (id) => {
    setIsEditModalOpen(true);
  };
  const handleClickOutsidePopup = () => {
    setPopupOn(false);
    setClickedOutside(true);
  };

  useEffect(() => {
    if (popupOn) {
      document.getElementById("overlay").classList.add("overlay");
    } else {
      document.getElementById("overlay").classList.remove("overlay");
    }
    // if (isPointerInPopup) {
    //   document.getElementById("imagePopup").classList.add("invisibleSwiper");
    // } else {
    //   document.getElementById("imagePopup").classList.add("visibleSwiper");
    // }
  }, [popupOn]);

  // const reveal = (event) => {
  //   event.target.previousElementSibling.style.clip =
  //     "rect(0px, " +
  //     (event.clientX - event.target.offsetLeft) +
  //     "px,450px,0px)";
  // };
  // function setCookie(cname, exdays) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  //   let expires = "expires=" + d.toUTCString();
  //   document.cookie = cname + "=" + expires + ";path=/";
  // }

  // function getCookie(cname) {
  //   let name = cname + "=";
  //   let ca = document.cookie.split(";");
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == " ") {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }

  // function checkCookie() {
  //   let user = getCookie("username");
  //   if (user != "") {
  //     setWasVisited(true);
  //   } else {
  //     setWasVisited(false);

  //     setCookie("username", 365);
  //   }
  // }
  // useEffect(() => {
  //   checkCookie();
  //   // setWasVisited(true);
  //   // setTimeout(() => {
  //   //   setWasVisited(false);
  //   // }, 4000);
  // }, []);
  return (
    <div>
      <Head>
        <title>Retro Zadar</title>
        <meta property="og:title" content="Retro Zadar" key="title" />
        <link
          rel="canonical"
          href="https://www.retrozadar.com/mapa"
          key="canonical"
        />
        <link
          rel="canonical"
          href="https://www.retrozadar.com"
          key="canonical"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/fav1.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/fav1.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/fav1.svg"
        />

        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:url" content="https://www.retrozadar.com/mapa" />

        <meta property="og:image" content="/ogRetro.png" />
        <meta
          name="description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Retro Zadar je jedinstvena mapa starih fotografija grada."
          key="desc"
        />
        <meta
          property="og:description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Retro Zadar je jedinstvena mapa starih fotografija grada."
        />
        <meta
          property="twitter:description"
          content="Pogledajte kako je nekad izgledao naš Zadar. Retro Zadar je jedinstvena mapa starih fotografija grada."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
      </Head>{" "}
      <div
        id="map"
        className={` ${featuresArray.length > 0 ? "map" : ""}`}
      ></div>
      {/* {popupOn && <Overlay onClick={() => handleClickOutsidePopup()} />} */}
      <div id="overlay"></div>
      {/* {!wasVisited && (
        <IntroTitle
          className={` ${
            wasVisited ? "introTitleVisible" : "introTitleInVisible"
          }`}
        >
          RETRO ZADAR
        </IntroTitle>
      )} */}
      {deleted && (
        <WrapLottie>
          <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
          <lottie-player
            src="https://lottie.host/3df28e7d-6695-41a3-99ef-7315d530a9c0/Aiy03FOFVN.json"
            background="transparent"
            speed="1"
            style={{ width: "100px", height: "100px" }}
            autoplay
          ></lottie-player>
        </WrapLottie>
      )}
      {isDeleting && (
        <WrapLottie>
          <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
          <lottie-player
            src="https://lottie.host/950d13f5-5a28-4fd7-a894-a954f1af82f3/ozM0HC2SPx.json"
            background="transparent"
            speed="1"
            style={{ width: "100px", height: "100px" }}
            autoplay
          ></lottie-player>
        </WrapLottie>
      )}
      {isModalOpen && (
        <FormModal
          toggleModal={toggleModal}
          lngLat={lngLat}
          allData={allDataFromDB}
        />
      )}
      {isEditModalOpen && (
        <EditFormModal
          toggleModal={toggleEditModal}
          id={idKliknuteFotke}
          data={featuresKliknuteFotke}
          allData={allDataFromDB}
        />
      )}
      <Naslov mapStyle={mapStyle}>
        RETRO ZADAR <br />
        {/* <span className="zadarNekad">Kako je Zadar izgledao nekad</span> */}
      </Naslov>
      <PodNaslov mapStyle={mapStyle}>
        {value[0]}-{value[1]}
      </PodNaslov>
      <PodNaslov2 mapStyle={mapStyle}>
        Posljednji update: {lastUpdate}
      </PodNaslov2>
      <Latest
        mapStyle={mapStyle}
        onClick={() => setIsLatest(!isLatest)}
        checked={isLatest}
        onMouseEnter={() => setIsLatestHovering(true)}
        onMouseLeave={() => setIsLatestHovering(false)}
      >
        {/* <label for="featured">Zadar nekad i sad</label>
        <input
          type="checkbox"
          id="featured"
          checked={isChecked}
          onChange={handleCheckbox}
        ></input> */}
        {/* <Image
          src={!isLatest ? "/swiper2.png" : "/swiper2white.png"}
          width={20}
          height={20}
        /> */}
        {isLatest ? <IoTime /> : <IoTimeOutline />}
        {/* <GrSplit /> */}
        Novo
      </Latest>
      {/* <FeaturedModal
        className={` ${
          isFeaturedHovering || isLatestHovering || isMapTogglerHovering
            ? "visibleModal"
            : "invisibleModal"
        }`}
      >
        {isFeaturedHovering ? "Zadar nekad i sad" : ""}
        {isLatestHovering ? "Novo na RETRO Zadar" : ""}
        {isMapTogglerHovering ? "Promjeni izgled mape" : ""}
      </FeaturedModal> */}
      {/* <Featured
        mapStyle={mapStyle}
        onClick={() => setIsChecked(!isChecked)}
        checked={isChecked}
        onMouseEnter={() => setIsFeaturedHovering(true)}
        onMouseLeave={() => setIsFeaturedHovering(false)}
      >

        <Image
          src={!isChecked ? "/swiper2.png" : "/swiper2white.png"}
          width={20}
          height={20}
        />
        Retro
      </Featured> */}
      <Upute />
      <div className={`slider ${mapStyle ? "darkSlider" : "lightSlider"}`}>
        <Sliderx
          getAriaLabel={() => "Raspon godina"}
          value={value}
          onChange={handleChange}
          getAriaValueText={valuetext}
          min={1749}
          max={1985}
          orientation="vertical"
          valueLabelDisplay="on"
        />
      </div>
      <div
        className="mapToggler"
        onClick={() => setMapStyle(!mapStyle)}
        onMouseEnter={() => setIsMapTogglerHovering(true)}
        onMouseLeave={() => setIsMapTogglerHovering(false)}
      >
        <BsLayersFill />
        Mape
      </div>
      {logedIn && (
        <div className="admin" onClick={handleLogOut}>
          Logout
        </div>
      )}
      {/* {idKliknuteFotke !== null && (
        <div className="viseInfo">
          <span class="tooltiptext">O slici</span>
          <IoBookSharp />
        </div>
      )} */}
      {/* {isDeleting && <div className="deleted">Brišem....</div>}
      {deleted && <div className="deleted">Obrisano - osvježi stranicu</div>} */}
      {logedIn && idKliknuteFotke !== null && (
        <>
          <div className="delete" onClick={() => handleDelete(idKliknuteFotke)}>
            Obriši
          </div>
          <div className="edit" onClick={() => handleEdit(idKliknuteFotke)}>
            Uredi
          </div>
        </>
      )}
      <div className={` ${featuresArray.length > 0 ? "map-overlay2" : ""}`}>
        <div id="feature-listing" className="listing"></div>
      </div>
    </div>
  );
}

export default Mapa;
