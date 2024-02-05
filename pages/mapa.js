import React, { useState, useEffect, useRef } from "react";
// import "../../i18next";
// import { useTranslation } from "react-i18next";
// import { GoInfo } from "react-icons/go";
// import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp"
import mapboxgl from "!mapbox-gl";
import Slider from "@mui/material/Slider";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import styled from "styled-components";
// import firebase from "gatsby-plugin-firebase";
import { db } from "../components/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
// import { Link } from "gatsby";

import useWindowSize from "../components/helper/usewindowsize";
import SliderGodina from "../components/SliderGodina";
import Slikejson from "../components/test.json";
import FormModal from "../components/modalForm";

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

const InfoWrap = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: #4e370c;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  right: 26px;
  top: 95px;
  z-index: 2;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 630px) {
    right: 26px;
    top: 102px;
    left: unset;
  }
`;
const Naslov = styled.div`
  position: fixed;
  right: 66px;
  top: 45px;
  z-index: 2;
  color: white;
  font-size: 55px;
  font-family: serif;
  font-style: bold;
  font-weight: 700;
  text-shadow: 0px 2px 11px #0000006e;
  @media screen and (max-width: 630px) {
    right: 26px;
    top: 102px;
    left: unset;
  }
`;
const PodNaslov = styled.div`
  position: fixed;
  right: 70px;
  top: 105px;
  z-index: 2;
  color: white;
  font-size: 35px;
  font-family: serif;
  font-style: bold;
  font-weight: 700;
  text-shadow: 0px 2px 11px #0000006e;
  @media screen and (max-width: 630px) {
    right: 26px;
    top: 102px;
    left: unset;
  }
`;
const PodNaslov2 = styled.div`
  position: fixed;
  right: 70px;
  top: 145px;
  z-index: 2;
  color: white;
  font-size: 35px;
  font-family: serif;
  font-style: bold;
  font-weight: 700;
  text-shadow: 0px 2px 11px #0000006e;
  @media screen and (max-width: 630px) {
    right: 26px;
    top: 102px;
    left: unset;
  }
`;
const PopupAnimacija = styled.div`
  position: absolute;
  left: 36px;
  top: 20px;
  z-index: 11;
  color: #4e370c;
  font-size: 12px;
  line-height: 16px;

  @media screen and (max-width: 630px) {
    width: 80%;
    left: 16px;
    top: 95px;
  }
`;
const KupiPosterWrap = styled.div`
  position: absolute;

  background-color: #ffffffac;
  display: flex;
  border-radius: 5px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  left: 26px;
  top: 25px;
  z-index: 2;
  color: #4e370c;
  font-size: 12px;
  line-height: 16px;

  @media screen and (max-width: 630px) {
    right: 26px;
    top: 102px;
    left: unset;
  }
`;
function Mapa({ data }) {
  //   const { t } = useTranslation();
  const size = useWindowSize();
  const mapContainer = useRef();

  const [value2, setValue2] = useState([1890, 1970]);
  const [innerHeight, setInnerHeight] = useState(null);
  const [lng, setLng] = useState(15.2224);
  const [lat, setLat] = useState(44.1197);
  const [lngLat, setLngLat] = useState(null);
  const [zoom, setZoom] = useState(13.4);
  const [hasPoints, setHasPoints] = useState(false);

  const [item, setItem] = useState([]);
  const [featuresArr, setFeaturesArr] = useState([]);
  const [show, setShow] = useState(false);
  const [popupFrame, setPopupFrame] = useState(null);
  const [hoverFrame, setHoverFrame] = useState(null);
  const [popupOn, setPopupOn] = useState(false);
  const [popupPoster, setPopupPoster] = useState(false);
  const [brojac, setBrojac] = useState(true);
  const [mapStyle, setMapStyle] = useState(false);

  const [geoData, setGeoData] = useState([]);
  const [geoData2, setGeoData2] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = React.useState([1890, 1980]);

  const bounds = {
    n: 44.2097,
    s: 44.0597,
    e: 15.3424,
    w: 15.0124,
  };
  const maxBounds = [
    [bounds.w, bounds.s],
    [bounds.e, bounds.n],
  ];
  const padding = { left: 300, right: 100, top: 100, bottom: 30 }; //<--- padding
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${Number(value[0])} godina do ${Number(value[1])} `;
  }

  //   const [lang, setLang] = useState(i18next.language);

  const dataJson = Slikejson;
  const fetchPost = async () => {
    await getDocs(collection(db, "cities")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        type: "Feature",
        properties: {
          datum_uploada: parseInt(doc.data().DateCreated),
          image_url_thumb: doc.data().Photo200px,
          image_url: doc.data().Photo1000px,
          title_naslov: doc.data().Title,
          longitude: doc.data().GPSLongitude,
          latitude: doc.data().GPSLatitude,
          icon: {
            iconUrl: doc.data().Photo200px,
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: "dot",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [doc.data().GPSLongitude, doc.data().GPSLatitude],
        },
        // ...doc.data(),
        id: doc.id,
      }));
      setGeoData({
        type: "FeatureCollection",
        features: newData,
      });
    });
  };

  console.log(geoData);
  useEffect(() => {
    fetchPost();
  }, []);

  //   useEffect(() => {
  //     // querySnapshot.docs.forEach((doc) => {
  //     //   console.log(doc.id, " => ", doc.data());
  //     // });
  //     // var listen = ref.on(db, (snapshot) => {
  //     //   var listaPodataka = [];
  //     //   snapshot.forEach((snap) => {
  //     //     var key = snap.key;
  //     //     var data = snap.val();
  //     //     console.log(data);
  //     //     data.List1.forEach((snap) => {
  //     //       listaPodataka.push({
  //     //         type: "Feature",
  //     //         properties: {
  //     //           datum_uploada: parseInt(snap.DateCreated.substring(0, 4)),
  //     //           image_url_thumb: snap.Photo200px,
  //     //           image_url: snap.Photo1000px,
  //     //           title_naslov: snap.Title,
  //     //           longitude: snap.GPSLongitude,
  //     //           latitude: snap.GPSLatitude,
  //     //           icon: {
  //     //             iconUrl: snap.Photo200px,
  //     //             iconSize: [50, 50], // size of the icon
  //     //             iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
  //     //             popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
  //     //             className: "dot",
  //     //           },
  //     //         },
  //     //         geometry: {
  //     //           type: "Point",
  //     //           coordinates: [snap.GPSLongitude, snap.GPSLatitude],
  //     //         },
  //     //       });
  //     //     });
  //     //   });
  //     //   const geoJsonedFlickr = {
  //     //     geoData: {
  //     //       type: "FeatureCollection",
  //     //       features: listaPodataka,
  //     //     },
  //     //   };
  //     //   setGeoData(listaPodataka);
  //     // });
  //     // const docRef = async () => {
  //     //   await addDoc(collection(db, "cities"), {
  //     //     geoJsonedFlickr,
  //     //   });
  //     //   console.log("Document written with ID: ", docRef.id);
  //     // };
  //     // docRef();
  //   }, []);

  //   useEffect(() => {
  //     setLang(i18next.language);
  //   }, [i18next.language]);

  //   useEffect(() => {
  //     async function getCustomers() {
  //       const data = await getDocs(collection(db, "cities"));
  //       data.forEach((doc) => {
  //         setGeoData(doc.data().geoData);
  //       }); // log each doc
  //     }
  //     getCustomers();
  //   }, []);

  useEffect(() => {
    if (geoData.length !== 0) {
      var filtrirano = geoData.features.filter(
        (razglednica) =>
          razglednica.properties.datum_uploada >= value[0] &&
          razglednica.properties.datum_uploada <= value[1]
      );
    }
    var objectFiltrirano = {
      type: "FeatureCollection",
      features: filtrirano,
    };
    setGeoData2(objectFiltrirano);
  }, [geoData, value]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle
        ? "mapbox://styles/jsango2/cjh3aevme24j82rs46qo4x14o"
        : "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      pitch: 40,
      zoom: zoom,
      maxBounds: maxBounds,
    });
    const popup = new mapboxgl.Popup({
      closeButton: true,
      anchor: "center",
      className: "moj-popupMapbox",
      maxWidth: "100%",
    });

    // console.log("Hover", hoverFrame);
    // if (hoverFrame !== null) {
    //   const marker = new mapboxgl.Marker()
    //     .setLngLat([
    //       hoverFrame.properties.longitude,
    //       hoverFrame.properties.latitude,
    //     ])
    //     .setPopup(new mapboxgl.Popup().setHTML("<h1>Helloh World!</h1>")) // add popup
    //     .addTo(map);
    // }

    popup.on("open", function () {
      setPopupOn(true);
    });
    popup.on("close", function () {
      setPopupOn(false);
    });

    // console.log(map)
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     countries: "hr",
    //     zoom: 20,
    //     marker: {
    //       color: "#CA8A5D",
    //     },
    //     // placeholder:
    //     //   lang === "hr" ? "Unesi mjesto u Dalmaciji" : "Dalmatian location",
    //     mapboxgl: mapboxgl,
    //   }),
    //   "top-right"
    // );

    map.on("load", function () {
      map.loadImage(
        mapStyle ? "/camera2.png" : "/camera3.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("cat", image);
        }
      );

      map.resize();

      map.addSource("cities", {
        type: "geojson",
        data: geoData2,
        cluster: true,
        clusterMaxZoom: 11, // Max zoom to cluster points on
        clusterRadius: 42, // Radius of each cluster when clustering points (defaults to 50)
        clusterMinPoints: 2,
      });

      //DODAVANJE POSTCARD IKONA:

      map.addLayer({
        id: "city",
        source: "cities",
        type: "symbol",
        layout: {
          "icon-image": "cat",
          "icon-size": ["interpolate", ["linear"], ["zoom"], 10, 0.2, 15, 0.2],
          "icon-padding": 0,
          "icon-allow-overlap": true,
          //   "icon-translate": [0, 0],
          //   "icon-halo-blur": 0.5,
        },
      });
      //   map.on("mousemove", "city", (e) => {
      //     // Change the cursor style as a UI indicator.
      //     map.getCanvas().style.cursor = "pointer";

      //     // Populate the popup and set its coordinates based on the feature.
      //     const feature = e.features[0];

      //     popup
      //       .setLngLat(feature.geometry.coordinates)
      //       .setHTML(
      //         `<div class='wrapPopup'>
      //             <div class='popupTitle'>
      //               <span style="font-weight: bold">${feature.properties.title_naslov},</span>
      //                ${feature.properties.datum_uploada}.
      //             </div>

      //             <div class="imgTest"><img src=${feature.properties.image_url} ></img></div>
      //           </div>

      //           `
      //       )
      //       //   .setText(
      //       //     // `${feature.properties.name} (${feature.properties.abbrev})`
      //       //     `${feature.properties.datum_uploada})`
      //       //   )
      //       .addTo(map);
      //   });

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
            80,
            "#202020",
            750,
            "#202020",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            80,
            30,
            750,
            40,
          ],
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
      map.on("idle", function () {
        setPopupPoster(true);
      });
      map.on("mouseenter", "clusters", function () {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", function () {
        map.getCanvas().style.cursor = "";
      });

      map.on("render", function () {
        var features = map.queryRenderedFeatures({ layers: ["city"] });

        setFeaturesArr(features);
      });
      map.on("dblclick", (e) => {
        setIsModalOpen(true);
        setLngLat(e.lngLat.wrap());
      });

      map.doubleClickZoom.disable();
      map.on("click", "city", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var feature = e.features[0];
        setShow(false);
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        if (feature.properties.title_naslov !== undefined) {
          popup
            .setLngLat(feature.geometry.coordinates)
            .setText(feature.properties.title_naslov)
            .setHTML(
              `<div class='wrapPopup'>
                  <div class='popupTitle'>
                    <span style="font-weight: bold">${feature.properties.title_naslov},</span>
                     ${feature.properties.datum_uploada}.
                  </div>

                  <div class="imgTest"><img src=${feature.properties.image_url} ></img></div>
                </div>

                `
            )

            .addTo(map);
        }
      });

      map.on("mouseleave", "city", function () {
        map.getCanvas().style.cursor = "";
        // popup.remove()
      });
      map.on("mouseenter", "city", function () {
        map.getCanvas().style.cursor = "pointer";
        // popup.remove();
      });
      map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: [lng, lat],
        zoom: size.width < 750 ? 5.9 : 13.2,
        bearing: 0,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.3, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
          return 1 - Math.pow(1 - t, 5);
        },

        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true,
      });
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

  //   function renderListings(features) {
  //     // var empty = document.createElement('p');
  //     // // Clear any existing listings
  //     // listingEl.innerHTML = '';
  //     if (features.length) {
  //       features.forEach(function (feature) {
  //         const prop = feature.properties;
  //         let itemData = [];
  //         itemData.href = prop.wikipedia;
  //         itemData.target = "_blank";
  //         itemData.textContent = prop.name + " (" + prop.abbrev + ")";
  //         setItem(itemData);
  //       });
  //     }
  //   }

  const handleThumbClickClose = (item) => {
    setShow((prev) => !prev);
  };
  const handleThumbClick = (item) => {
    setShow((prev) => !prev);
    setPopupFrame(item);
  };
  const handleMouseEnter = (item) => {
    console.log(item);
    setHoverFrame(item);

    // const popup = new mapboxgl.Popup({ closeOnClick: false })
    //   .setLngLat([item.properties.latitude, item.properties.longitude])
    //   .setHTML("<h1>Hello World!</h1>")
    //   .addTo(map);
  };
  const handleChangeGodinaDelayed = (event, newValue) => {
    setValue2(newValue);
  };
  const handleChangeGodina = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (popupPoster === true) {
      setTimeout(function () {
        setPopupPoster(false);
        setBrojac(false);
      }, 10000);
    }
  }, [popupPoster]);

  useEffect(() => {
    featuresArr.map((item) =>
      item.properties.title_naslov ? setHasPoints(true) : setHasPoints(false)
    );
  }, [featuresArr]);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);
  const ref = useRef();
  //   useOnClickOutside(ref, () => setIsOpen(false));
  const toggleModal = () => {
    setIsModalOpen(false);
    setHasPoints(true);
  };

  return (
    <>
      {/* <SEO
        title="Razglednice na mapi"
        description="Interaktivna mapa sa razglednicama iz Zaboravljene Dalmacije"
      /> */}
      {/* <Header></Header> */}
      <div className="mapWrapper">
        {/* <InfoBlock isOpen={isOpen} /> */}
        {/* <GoInfo /> */}
        {/* <FirebaseUpload /> */}
        {/* {lang === "hr"
          ? popupPoster &&
            brojac && (
              <Link to="/Kontakt">
                <PopupAnimacija>
                  <Lottie animationData={animation1152Hr} loop={false} />
                </PopupAnimacija>
              </Link>
            )
          : popupPoster &&
            brojac && (
              <Link to="/Kontakt">
                <PopupAnimacija>
                  <Lottie animationData={animation1152En} loop={false} />
                </PopupAnimacija>
              </Link>
            )} */}
        <div className="map-overlay">
          {isModalOpen && (
            <FormModal toggleModal={toggleModal} lngLat={lngLat} />
          )}
          <Naslov>RETRO ZADAR</Naslov>
          <PodNaslov>
            {value[0]}-{value[1]}
          </PodNaslov>
          {lngLat !== null && (
            <PodNaslov2>
              {lngLat.lng.toFixed(4)} , {lngLat.lat.toFixed(4)}
            </PodNaslov2>
          )}
          <div className="slider">
            <Slider
              getAriaLabel={() => "Raspon godina"}
              value={value}
              onChange={handleChange}
              getAriaValueText={valuetext}
              min={1880}
              max={2024}
              orientation="vertical"
              valueLabelDisplay="on"
            />
          </div>
          {/* <input type="range" onChange={handleChangeGodina} value={value} /> */}
        </div>{" "}
        <div
          className={`slides-wrap ${
            hasPoints && featuresArr.length > 0 && zoom > 14.3 && !isModalOpen
              ? "inViewSlides"
              : "outViewSlides"
          }`}
        >
          {zoom > 14.3
            ? featuresArr.length
              ? featuresArr.map((item, index) =>
                  item.properties.title_naslov ? (
                    <div
                      key={index}
                      className={`slides-div ${
                        popupOn ? "active-slides-div" : ""
                      }`}
                      onClick={() => handleThumbClick(item)}
                      onMouseEnter={() => handleMouseEnter(item)}
                    >
                      <img src={item.properties.image_url_thumb} alt="" />
                      {/* <div
                        style={{
                          position: "absolute",
                          zIndex: "1",
                          bottom: "5px",
                          left: "0",
                          marginLeft: "15px",
                          marginTop: "0",
                          fontSize: "1.2rem",
                          display: "flex",
                          flexDirection: "row-reverse",
                          textShadow: "2px 2px 2px black",
                          alignItems: "center",
                          color: "white",
                        }}
                      ></div> */}
                    </div>
                  ) : null
                )
              : null
            : null}
        </div>
        <div className="mapToggler" onClick={() => setMapStyle(!mapStyle)}>
          {mapStyle ? "Satelit" : "Mapa"}
        </div>
        <div
          className="map-container"
          //   style={{ height: `${innerHeight}px` }}
          ref={mapContainer}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {show && (
            <div className="popupFrame">
              <div
                style={{
                  position: "relative",
                  top: "-55px",
                  zIndex: "2",
                }}
              >
                <div className="popupFrameDataWrap">
                  <div>
                    <b>{popupFrame.properties.title_naslov},</b>
                    &nbsp;{popupFrame.properties.datum_uploada}
                  </div>
                  <div onClick={handleThumbClickClose} className="x">
                    X
                  </div>
                </div>{" "}
                <img src={popupFrame.properties.image_url} alt="postcard" />
              </div>
            </div>
          )}
        </div>
      </div>{" "}
    </>
  );
}

export default Mapa;
