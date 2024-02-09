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
import { db, auth } from "../components/firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
// import { Link } from "gatsby";
import { BsLayersFill } from "react-icons/bs";
import useWindowSize from "../components/helper/usewindowsize";
import SliderGodina from "../components/SliderGodina";
import Slikejson from "../components/test.json";
import FormModal from "../components/modalForm";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
  right: 66px;
  top: 45px;
  z-index: 2;
  color: white;
  font-size: 55px;
  font-family: serif;
  font-style: bold;
  font-weight: 700;
  text-shadow: 0px 2px 11px #0000006e;
  @media screen and (max-width: 800px) {
    right: 26px;
    top: 25px;

    font-size: 24px;
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
  @media screen and (max-width: 800px) {
    right: 26px;

    top: 55px;

    font-size: 18px;
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
const NemaFotografije = styled.div`
  /* position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2;
  color: white;
  font-size: 35px;
  font-family: serif;
  font-style: bold;
  font-weight: 700;
  text-shadow: 0px 2px 11px #0000006e;
  transform: translate(-50%, -50%);
  width: 400px;
  text-align: center;
  line-height: 140%; */
  @media screen and (max-width: 630px) {
    /* right: 26px;
    top: 102px;
    left: unset; */
  }
`;

function Mapa({ data }) {
  //   const { t } = useTranslation();
  const size = useWindowSize();
  const mapContainer = useRef();
  const router = useRouter();

  const [value2, setValue2] = useState([1850, 1970]);
  const [innerHeight, setInnerHeight] = useState(null);
  const [lng, setLng] = useState(15.2224);
  const [lat, setLat] = useState(44.1197);
  const [lngLat, setLngLat] = useState(null);
  const [zoom, setZoom] = useState(13.4);
  const [hasPoints, setHasPoints] = useState(false);

  const [item, setItem] = useState([]);
  const [featuresArray, setFeaturesArray] = useState([]);
  const [featuresArr, setFeaturesArr] = useState([]);
  const [show, setShow] = useState(false);
  const [popupFrame, setPopupFrame] = useState(null);
  const [hoverFrame, setHoverFrame] = useState(null);
  const [idKliknuteFotke, setIdKliknuteFotke] = useState(null);
  const [popupOn, setPopupOn] = useState(false);
  const [popupPoster, setPopupPoster] = useState(false);
  const [mapStyle, setMapStyle] = useState(true);
  const [hasNewPhoto, setHasNewPhoto] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [nemaFotografije, setNemaFotografije] = useState(true);
  const [logedIn, setlogedIn] = useState(null);
  const [emailError, setEmailError] = useState("");

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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${Number(value[0])} godina do ${Number(value[1])} `;
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setlogedIn(true);
        setEmailError("");
        router.push("/mapa2");
        console.log("OnAuthStateChanged: Logged in");
      } else {
        setlogedIn(false);
        console.log("OnAuthStateChanged: Logged out");
      }
    });
  }, []);

  //   const [lang, setLang] = useState(i18next.language);
  const dataJson = Slikejson;
  const fetchPost = async () => {
    await getDocs(collection(db, "cities")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        type: "Feature",
        properties: {
          datum_uploada: parseInt(doc.data().DateCreated),
          image_url_thumb: doc.data().Photo50px,
          image_url_1000px: doc.data().Photo1000px,
          image_url_200px: doc.data().Photo200px,
          newPhoto: doc.data().newPhoto,
          title_naslov: doc.data().Title,
          longitude: doc.data().GPSLongitude,
          latitude: doc.data().GPSLatitude,

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
  useEffect(() => {
    fetchPost();
  }, []);

  //---

  // const Render = () => {
  //   return <div style={{ color: "black" }}>Jure</div>;
  // };

  //---

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

  // -----
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: mapStyle
        ? "mapbox://styles/jsango2/cjh3aevme24j82rs46qo4x14o"
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
      // anchor: "center",
      // className: "moj-popupMapbox",
      // maxWidth: "100%",
    });
    const popup2 = new mapboxgl.Popup({
      closeButton: true,
      anchor: "center",
      className: "moj-popupMapbox",
      maxWidth: "100%",
    });
    const popup3 = new mapboxgl.Popup({
      closeButton: false,
    });

    // popup.on("open", function () {
    //   setPopupOn(true);
    // });
    // popup.on("close", function () {
    //   setPopupOn(false);
    // });

    // console.log(map)
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("load", function () {
      map.loadImage(
        mapStyle ? "/camera2.png" : "/camera3.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("cat", image);
        }
      );

      map.resize();

      // map.addSource("airports", {
      //   type: "vector",
      //   url: "mapbox://mapbox.04w69w5j",
      // });
      // map.addLayer({
      //   id: "airport",
      //   source: "airports",
      //   "source-layer": "ne_10m_airports",
      //   type: "circle",
      //   paint: {
      //     "circle-color": "#4264fb",
      //     "circle-radius": 4,
      //     "circle-stroke-width": 2,
      //     "circle-stroke-color": "#ffffff",
      //   },
      // });
      let airports = [];
      // const filterEl = document.getElementById("feature-filter");
      const listingEl = document.getElementById("feature-listing");

      // function renderListings(features) {
      //   const empty = document.createElement("p");
      //   // Clear any existing listings
      //   listingEl.innerHTML = "";
      //   if (features.length) {
      //     for (const feature of features) {
      //       const itemLink = document.createElement("div");
      //       const label = `${feature.properties.title_naslov} `;
      //       // itemLink.href = feature.properties.wikipedia;
      //       // itemLink.target = "_blank";
      //       itemLink.textContent = label;
      //       itemLink.style.backgroundImage = `url(${feature.properties.image_url})`;
      //       itemLink.addEventListener("mouseover", () => {
      //         // Highlight corresponding feature on the map
      //         popup
      //           .setLngLat([
      //             feature.properties.longitude,
      //             feature.properties.latitude,
      //           ])
      //           .setText(label)
      //           .setHTML(
      //             `<div >
      //                   <div class="imgThumb"><img class="imgPopup" src=${feature.properties.image_url} ></img></div>
      //                 </div>

      //                 `
      //           )

      //           .addTo(map);
      //       });
      //       listingEl.appendChild(itemLink);
      //     }

      //     //   // Show the filter input
      //     //   filterEl.parentNode.style.display = "block";
      //     // } else if (features.length === 0 && filterEl.value !== "") {
      //     //   empty.textContent = "No results found";
      //     //   listingEl.appendChild(empty);
      //     // } else {
      //     //   empty.textContent = "Drag the map to populate results";
      //     //   listingEl.appendChild(empty);

      //     //   // Hide the filter input
      //     //   filterEl.parentNode.style.display = "none";

      //     // remove features filter
      //     map.setFilter("airport", ["has", "abbrev"]);
      //   }
      // }

      function getUniqueFeatures(features, comparatorProperty) {
        const uniqueIds = new Set();
        const uniqueFeatures = [];
        for (const feature of features) {
          const id = feature.properties[comparatorProperty];
          if (!uniqueIds.has(id)) {
            uniqueIds.add(id);
            uniqueFeatures.push(feature);
          }
        }
        return uniqueFeatures;
      }
      map.on("moveend", () => {
        const features = map.queryRenderedFeatures({ layers: ["city"] });
        setFeaturesArray(features);
        console.log("Broj fotografija:", features.length);

        // if (features) {
        //   const uniqueFeatures = getUniqueFeatures(features, "iata_code");
        // Populate features for the listing overlay.

        RenderListings(features.slice(0, 6));
        function RenderListings(features) {
          const featuresWithoutClusters = features.filter(
            (feature) => feature.properties.datum_uploada
          );
          const empty = document.createElement("p");
          // Clear any existing listings
          listingEl.innerHTML = "";
          if (features.length) {
            for (const feature of featuresWithoutClusters) {
              const itemLink = document.createElement("figure");
              itemLink.id = "imageDiv";
              const p = document.createElement("div");
              console.log("Feature", feature);
              // var foo = document.getElementById("imageDiv");
              // itemLink.appendChild(node);

              const label = `${feature.properties.title_naslov},${feature.properties.datum_uploada}  `;

              itemLink.appendChild(p);
              p.textContent = label;
              var DOM_img = document.createElement("img");
              if (feature.properties.newPhoto) {
                var hasNewPhotoDiv = document.createElement("area");
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
                    <div class=${
                      feature.properties.newPhoto ? "hasNewPhoto" : ""
                    }>

                            </div>
                            <div class="imgThumb"><img class="imgPopup" src=${
                              feature.properties.image_url_1000px
                            } ></img></div>
                          </div>
          
                          `
                  )

                  .addTo(map);
              });
              // if (feature.properties.newPhoto) {
              //   itemLink.addEventListener("mouseover", () => {
              //     // Highlight corresponding feature on the map
              //     popup3
              //       .setLngLat([
              //         feature.properties.longitude,
              //         feature.properties.latitude,
              //       ])
              //       .setText(label)
              //       .setHTML(
              //         `<div class="hasNewPhoto">

              //               </div>

              //               `
              //       )

              //       .addTo(map);
              //   });
              // }

              listingEl.appendChild(itemLink);
            }

            //   // Show the filter input
            //   filterEl.parentNode.style.display = "block";
            // } else if (features.length === 0 && filterEl.value !== "") {
            //   empty.textContent = "No results found";
            //   listingEl.appendChild(empty);
            // } else {
            //   empty.textContent = "Drag the map to populate results";
            //   listingEl.appendChild(empty);

            //   // Hide the filter input
            //   filterEl.parentNode.style.display = "none";

            // remove features filter
            // map.setFilter("airport", ["has", "abbrev"]);
          }
          if (features.length === 0) {
            setNemaFotografije(true);
          } else {
            setNemaFotografije(false);
          }
        }

        // Clear the input container
        // filterEl.value = "";

        // Store the current features in sn `airports` variable to
        // later use for filtering on `keyup`.
        airports = features;
        // }
      });

      map.addSource("cities", {
        type: "geojson",
        data: geoData2,
        cluster: true,
        clusterMaxZoom: 13, // Max zoom to cluster points on
        clusterRadius: 42, // Radius of each cluster when clustering points (defaults to 50)
        clusterMinPoints: 2,
      });

      //DODAVANJE POSTCARD IKONA:

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
          "icon-size": ["interpolate", ["linear"], ["zoom"], 10, 0.2, 15, 0.2],
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
      map.on("idle", function () {
        setPopupPoster(true);
      });

      map.on("render", function () {
        var features = map.queryRenderedFeatures({ layers: ["city"] });
        setFeaturesArr(features);
      });
      map.on("dblclick", (e) => {
        if (logedIn) {
          setIsModalOpen(true);
          setLngLat(e.lngLat.wrap());
        }
      });
      map.doubleClickZoom.disable();

      map.on("click", "city", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var feature = e.features[0];
        console.log(feature);
        setIdKliknuteFotke(e.features[0].properties.id);
        if (e.features[0].properties.newPhoto) {
          setHasNewPhoto(true);
        } else {
          setHasNewPhoto(false);
        }

        // var foo = document.getElementById("imageDiv");
        // itemLink.appendChild(node);
        setPopupOn(true);
        setShow(false);
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        if (feature.properties.newPhoto) {
          popup2
            .setLngLat(feature.geometry.coordinates)
            .setText(feature.properties.title_naslov)
            .setHTML(
              `<div class='reveal'>

                       <div class='popupTitle'>
                          <span style="font-weight: bold">${feature.properties.title_naslov},</span>
                          ${feature.properties.datum_uploada}
                        </div>
                 <img class="img3" src=${feature.properties.image_url_200px} ></img>
                   <img id="img4" class="img4" src=${feature.properties.newPhoto} ></img>
                <div id="activator" class="activator"></div>
                <div id="divider" class="divider"><div class="circle"></div></div>
             
              </div>

              `
            )

            .addTo(map);
          if (size.width > 430) {
            document
              .getElementById("activator")
              .addEventListener(
                size.width < 430 ? "touchmove" : "mousemove",
                (event) => {
                  console.log(event);
                  const divider = document.getElementById("divider");
                  divider.style.left = event.offsetX + "px";
                  event.target.previousElementSibling.style.clip =
                    "rect(0px, " + event.offsetX + "px,450px,0px)";
                }
              );
          } else {
            document
              .getElementById("activator")
              .addEventListener(
                size.width < 430 ? "touchmove" : "mousemove",
                (event) => {
                  console.log(event);
                  const divider = document.getElementById("divider");
                  divider.style.left = event.touches[0].clientX + "px";
                  event.target.previousElementSibling.style.clip =
                    "rect(0px, " + event.touches[0].clientX + "px,450px,0px)";
                }
              );
          }

          // document
          //   .getElementById("activator")
          //   .addEventListener("mousemove", (event) => {
          //     console.log(event);
          //     event.target.previousElementSibling.style.clipPath =
          //       "inset(0px  " + event.offsetX + ") calc(100% - 450px) 0px)";
          //   });

          // clip-path: inset(0px calc(100% - 225px) calc(100% - 450px) 0px);
          // popup2
          //   .setLngLat(feature.geometry.coordinates)
          //   .setText(feature.properties.title_naslov)
          //   .setHTML(
          //     `<div class='wrapPopup'>

          //         <div class='popupTitle'>
          //           <span style="font-weight: bold">${feature.properties.title_naslov},</span>
          //            ${feature.properties.datum_uploada}
          //         </div>
          //         <div  class="imgTest" ><img src=${feature.properties.image_url_200px} ></img></div>
          //         <div  class="imgNewBg" ><img src=${feature.properties.newPhoto} ></img></div>
          //         <div id="jure">...i danas</div>
          //       </div>

          //       `
          //   )

          //   .addTo(map);

          // document.getElementById("jure").addEventListener("click", fld);
          // function fld() {
          //   document.getElementsByClassName("imgTest")[0].style.opacity = "0";
          //   document.getElementsByClassName("imgNewBg")[0].style.opacity = "1";
          // }
        } else {
          popup2
            .setLngLat(feature.geometry.coordinates)
            .setText(feature.properties.title_naslov)
            .setHTML(
              `<div class='wrapPopup'>

                <div class='popupTitle'>
                  <span style="font-weight: bold">${feature.properties.title_naslov},</span>
                   ${feature.properties.datum_uploada}
                </div>
                <div  class="imgTest" ><img src=${feature.properties.image_url_200px} ></img></div>
          
     
              </div>

              `
            )

            .addTo(map);
        }
      });

      popup2.on("close", () => {
        setIdKliknuteFotke(null);
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "cities", id));
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 2000);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (popupOn) {
      document.getElementById("overlay").classList.add("overlay");
    } else {
      document.getElementById("overlay").classList.remove("overlay");
    }
  }, [popupOn]);

  // const reveal = (event) => {
  //   event.target.previousElementSibling.style.clip =
  //     "rect(0px, " +
  //     (event.clientX - event.target.offsetLeft) +
  //     "px,450px,0px)";
  // };

  return (
    <>
      {" "}
      <div id="map"></div>
      <div id="overlay"></div>
      {isModalOpen && <FormModal toggleModal={toggleModal} lngLat={lngLat} />}
      <Naslov>RETRO ZADAR</Naslov>
      <PodNaslov>
        {value[0]}-{value[1]}
      </PodNaslov>
      <NemaFotografije
        className={`${
          nemaFotografije ? "nemaFotografijeOut" : "nemaFotografijeIn"
        }`}
      >
        Na ovom dijelu karte nema fotografija
      </NemaFotografije>
      <div className="slider">
        <Slider
          getAriaLabel={() => "Raspon godina"}
          value={value}
          onChange={handleChange}
          getAriaValueText={valuetext}
          min={1850}
          max={2024}
          orientation="vertical"
          valueLabelDisplay="on"
        />
      </div>
      <div className="mapToggler" onClick={() => setMapStyle(!mapStyle)}>
        <BsLayersFill />
      </div>
      {logedIn && (
        <div className="admin" onClick={handleLogOut}>
          Logout Admin
        </div>
      )}
      {deleted && <div className="deleted">Obrisano - osvježi stranicu</div>}
      {logedIn && idKliknuteFotke !== null && (
        <div className="delete" onClick={() => handleDelete(idKliknuteFotke)}>
          Obriši
        </div>
      )}
      <div className="map-overlay2">
        <div id="feature-listing" className="listing"></div>
      </div>
    </>
  );
}

export default Mapa;
