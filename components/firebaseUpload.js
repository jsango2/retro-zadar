import React, { useState, useEffect, useRef } from "react";
// import firebase from "gatsby-plugin-firebase";
import Slikejson from "./test.json";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";

//FUNKCIJA ZA UPLOADANJE LOKACIJA U FIREBASE FIRESTORE. SAMO SPOJI JSON FILE SA DATUMOM, GPSOM I NAZIVOM I LINKOM NA FOTKE
function FirebaseUpload() {
  const [geoData, setGeoData] = useState([]);

  const data = Slikejson;
  console.log(data);
  useEffect(() => {
    // var ref = firebase.database().ref("/");
    // var listen = ref.on("value", (snapshot) => {
    var listaPodataka = [];
    // snapshot.forEach((snap) => {
    // var key = snap.key;
    // var data = snap.val();
    // console.log(data);
    data.List1.forEach((snap) => {
      listaPodataka.push({
        type: "Feature",
        properties: {
          datum_uploada: parseInt(snap.DateCreated.substring(0, 4)),
          image_url_thumb: snap.Photo200px,
          image_url: snap.Photo1000px,
          title_naslov: snap.Title,
          longitude: snap.GPSLongitude,
          latitude: snap.GPSLatitude,
          icon: {
            iconUrl: snap.Photo200px,
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: "dot",
          },
        },
        geometry: {
          type: "Point",
          coordinates: [snap.GPSLongitude, snap.GPSLatitude],
        },
      });
    });
    // });
    const geoJsonedFlickr = {
      geoData: {
        type: "FeatureCollection",
        features: listaPodataka,
      },
    };

    // });

    // const docRef = async () => {
    //   await addDoc(collection(db, "cities"), {
    //     geoJsonedFlickr,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // };
    // docRef();
  }, []);
}

export default FirebaseUpload;
