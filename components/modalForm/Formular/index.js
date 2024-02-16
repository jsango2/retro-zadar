import { UploadBlockTop, UploadBlockTopLayer, WrapAll } from "./style.js";
import uuid from "react-uuid";

import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledButtonMob,
  StyledLabel,
  StyledTextarea,
  WrapData,
  DoubleRow,
  SmallBlock,
  WrapUpload,
  UploadBlock,
  WrapLottie,
} from "./style.js";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Script from "next/script";

import { db } from "../../firebase/firebase";
import Image from "next/image.js";
import Resizer from "react-image-file-resizer";
import { storage } from "../../firebase/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { dataBackup } from "../../../dataBackup.js";

function Formular({ lng, lat, toggleModal, allData }) {
  const [mjesto, setMjesto] = useState("");
  const [autor, setAutor] = useState("");
  const [email, setEmail] = useState("");
  const [godina, setGodina] = useState("");
  const [poruka, setPoruka] = useState("");
  const [file, setFile] = useState(null);
  const [fileNewPhoto, setFileNewPhoto] = useState(null);
  const [checked, setChecked] = useState(false);
  const [fotoLayout, setFotoLayout] = useState("landscape");
  // const [image, setImage] = useState(null);
  const [fileThumb, setFileThumb] = useState(null);
  const [percent, setPercent] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [largeImage, setLargeImage] = useState(null);
  const [largeImageurl, setLargeImageUrl] = useState("");
  const [thumbImage, setThumbImage] = useState(null);
  const [thumbImageUrl, setThumbImageURL] = useState("");
  const [URLs, setURLs] = useState([]);
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [lastURLs, setlastURLs] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // uploadFiles(selectedImages);

    uploadlargeImage(largeImage);
    if (fileNewPhoto !== null) {
      uploadNewPhoto(fileNewPhoto);
    }
  };

  // const uploadlargeImage = (files) => {
  //   setLoading(true);
  //   const imageLinks = [];
  //   for (let i = 0; i < files.length; i++) {
  //     let image = files[i];
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append(
  //       "upload_preset",
  //       process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  //     );
  //     data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  //     data.append("folder", "Cloudinary-React");

  //     fetch(
  //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //       {
  //         method: "POST",
  //         body: data,
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((res) => {
  //         imageLinks.push(res.url);
  //         console.log(imageLinks);
  //         setURLs((oldArray) => [...oldArray, res.url]);
  //         if (fileNewPhoto !== null) {
  //           uploadNewPhoto(fileNewPhoto);
  //         }
  //       })
  //       .catch((err) => setLoading(false));
  //   }
  // };

  const uploadlargeImage = (files) => {
    setLoading(true);
    const imageLinks = [];

    let image = files;
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(imageLinks);
        setLargeImageUrl(res.url);
        uploadThumbPhoto(thumbImage);
      })
      .catch((err) => setLoading(false));
  };

  const uploadNewPhoto = (file) => {
    let image = file;
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("new photo url:", res.url);

        setNewPhotoURL(res.url);
        // uploadThumbPhoto(thumbImage);
      });
  };

  const uploadThumbPhoto = (file) => {
    let image = file;
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("new photo url:", res.url);

        setThumbImageURL(res.url);
      });
  };
  useEffect(() => {
    if (thumbImageUrl !== "" && largeImageurl && fileNewPhoto === null) {
      const newEntry = {
        Title: mjesto,
        DateCreated: godina,
        GPSLatitude: lat,
        GPSLongitude: lng,
        Photo1000px: thumbImageUrl,
        Photo200px: largeImageurl,
        newPhoto: "",
        procjenaGodine: checked,
        autor: autor,
        fotoLayout: fotoLayout,
        timestamp: Date.now(),
        id: uuid(),
      };
      allData.push(newEntry);
      // const docRef = doc(db, "retroData", "RJHT2JQsp8yK52ztOn1z");
      const docRef = doc(db, "retroData5", "test");

      setDoc(docRef, { allData });
      console.log("WRITTEN NO NEW PHOTO");
      setGodina("");
      setMjesto("");
      setAutor("");
      setFile(null);
      setFileNewPhoto(null);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toggleModal();
      }, 2000);
    }
    if (thumbImageUrl !== "" && largeImageurl && newPhotoURL !== "") {
      const newEntry = {
        Title: mjesto,
        DateCreated: godina,
        GPSLatitude: lat,
        GPSLongitude: lng,
        Photo1000px: thumbImageUrl,
        Photo200px: largeImageurl,
        newPhoto: newPhotoURL,
        procjenaGodine: checked,
        autor: autor,
        fotoLayout: fotoLayout,
        timestamp: Date.now(),
        id: uuid(),
      };
      allData.push(newEntry);
      // const docRef = doc(db, "retroData", "RJHT2JQsp8yK52ztOn1z");
      const docRef = doc(db, "retroData5", "test");

      setDoc(docRef, { allData });
      console.log("WRITTEN WITH NEW PHOTO");

      setGodina("");
      setMjesto("");
      setAutor("");
      setFile(null);
      setFileNewPhoto(null);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toggleModal();
      }, 2000);
    }
  }, [thumbImageUrl, newPhotoURL, largeImageurl]);

  console.log(allData);
  // useEffect(() => {
  //   if (thumbImageUrl !== "" && largeImageurl && fileNewPhoto === null) {
  //     console.log("USE EFFE");
  //     const docRef = setDoc(doc(db, "retroData5", "test"), {
  //       Title: mjesto,
  //       DateCreated: godina,
  //       GPSLatitude: lat,
  //       GPSLongitude: lng,
  //       Photo1000px: thumbImageUrl,
  //       Photo200px: largeImageurl,
  //       newPhoto: "",
  //       procjenaGodine: checked,
  //       autor: autor,
  //       fotoLayout: fotoLayout,
  //       timestamp: Date.now(),
  //       id: uuid(),
  //     });
  //     setGodina("");
  //     setMjesto("");
  //     setAutor("");
  //     setFile(null);
  //     setFileNewPhoto(null);
  //     toggleModal();
  //   }
  //   if (thumbImageUrl !== "" && largeImageurl && newPhotoURL !== "") {
  //     console.log("USE EFFE ELSE");
  //     const docRef = setDoc(doc(db, "retroZdTest", "4wdXGIUvEFX2QKeMvQ2K"), {
  //       Title: mjesto,
  //       DateCreated: godina,
  //       GPSLatitude: lat,
  //       GPSLongitude: lng,
  //       Photo1000px: thumbImageUrl,
  //       Photo200px: largeImageurl,
  //       newPhoto: newPhotoURL,
  //       procjenaGodine: checked,
  //       autor: autor,
  //       fotoLayout: fotoLayout,
  //       timestamp: Date.now(),
  //       id: uuid(),
  //     });
  //     setGodina("");
  //     setMjesto("");
  //     setAutor("");
  //     setFile(null);
  //     setFileNewPhoto(null);
  //     toggleModal();
  //   }
  // }, [thumbImageUrl, newPhotoURL, largeImageurl]);
  // console.log("ALL DATA", allData);

  // useEffect(() => {
  //   console.log("USE EFFE dodan u fb");

  //   const docRef = doc(db, "retroData5", "test");
  //   setDoc(docRef, { allData });
  // }, []);

  const handleUpload = () => {
    uploadFiles(images);
  };
  const handleMjesto = (e) => {
    setMjesto(e.target.value);
  };
  const handleAutor = (e) => {
    setAutor(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleGodina = (e) => {
    setGodina(e.target.value);
  };

  // const handleFile = (e) => {
  //   setFile(e.target.value);
  // };

  const resizeFile2 = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  const resizeFile3 = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        700,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const handleChange = async (event) => {
    setFile(event.target.files[0]);

    try {
      const image250px = await resizeFile2(event.target.files[0]);
      const image1000px = await resizeFile3(event.target.files[0]);

      setSelectedImages([image250px, image1000px]);
      setLargeImage(image1000px);
      setThumbImage(image250px);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeNewPhoto = async (event) => {
    try {
      const image1000px = await resizeFile3(event.target.files[0]);

      setFileNewPhoto(image1000px);
    } catch (err) {
      console.log(err);
    }
  };

  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }

  // const handleUpload = () => {
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );

  //       // update progress
  //       setPercent(percent);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       // download url
  //       getDownloadURL(uploadTask.snapshot.ref).then((CV) => {
  //         const docRef = async () => {
  //           await addDoc(collection(db, "cities"), {
  //             Title: mjesto,
  //             DateCreated: godina,
  //             GPSLatitude: lat,
  //             GPSLongitude: lng,
  //             Photo1000px: CV,
  //             Photo200px: CV,
  //           });
  //         };
  //         docRef();
  //         setGodina("");
  //         setMjesto("");

  //         setFile(null);
  //       });
  //     }
  //   );
  // };

  // const uploadFiles = (files) => {

  //   // files.map((file) => {
  //   //   console.log("loop");
  //   //   const sotrageRef = ref(storage, `files/${file.name}`);
  //   //   const uploadTask = uploadBytesResumable(sotrageRef, file);
  //   //   promises.push(uploadTask);
  //   //   uploadTask.on(
  //   //     "state_changed",
  //   //     (snapshot) => {
  //   //       // const prog = Math.round(
  //   //       //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //   //       // );
  //   //       // setProgress(prog);
  //   //     },
  //   //     (error) => console.log(error),
  //   //     async () => {
  //   //       await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
  //   //         setURLs((prevState) => [...prevState, downloadURLs]);
  //   //         console.log("File available at", downloadURLs);

  //   //         // const docRef = addDoc(collection(db, "cities"), {
  //   //         //   Title: mjesto,
  //   //         //   DateCreated: godina,
  //   //         //   GPSLatitude: lat,
  //   //         //   GPSLongitude: lng,
  //   //         //   Photo1000px: URLs[1],
  //   //         //   Photo200px: URLs[0],
  //   //         // });
  //   //         // console.log("Document written with ID: ", docRef.id);

  //   //         // setGodina("");
  //   //         // setMjesto("");

  //   //         // setFile(null);
  //   //       });
  //   //     }
  //   //   );
  //   // });

  //   // Promise.all(promises).then(() => {
  //   //   console.log("promises done");
  //   // });
  // };
  // console.log(url);

  // const buttonEnabled = (username, password) => {
  //   if (username.length > 0 && password.length > 0) {
  //     setEnabled(true);
  //   } else {
  //     setEnabled(false);
  //   }
  // };
  const handleRadioChange = (value) => {
    setFotoLayout(value);
  };
  console.log(fotoLayout);
  return (
    <WrapAll>
      {loading && (
        <WrapLottie>
          <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
          <lottie-player
            src="https://assets8.lottiefiles.com/private_files/lf30_nsqfzxxx.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            autoplay
          ></lottie-player>
        </WrapLottie>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <WrapData>
          <SmallBlock>
            <StyledLabel>Mjesto</StyledLabel>
            <StyledInput
              type="text"
              value={mjesto}
              onChange={(e) => handleMjesto(e)}
              required
            />
            <StyledLabel>Godina</StyledLabel>
            <StyledInput
              type="number"
              value={godina}
              required
              onChange={(e) => handleGodina(e)}
            />
            <StyledLabel>Autor fotografije</StyledLabel>
            <StyledInput
              type="text"
              value={autor}
              onChange={(e) => handleAutor(e)}
            />
          </SmallBlock>
          <StyledLabel>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckbox}
            />
            Godina je procjenjena
          </StyledLabel>
          <WrapUpload>
            <StyledLabel>Upload foto</StyledLabel>
            <UploadBlock type="file" onChange={handleChange} accept="image/*" />
            {/* {file !== null && (
              <div style={{ color: "black", marginTop: "20px" }}>
                {file.name}
              </div>
            )} */}
            <StyledLabel>Upload new foto</StyledLabel>
            <UploadBlock
              type="file"
              onChange={handleChangeNewPhoto}
              accept="image/*"
            />
            <StyledLabel>
              <input
                type="radio"
                name="fotoLayout"
                value="landscape"
                onChange={(e) => handleRadioChange(e.target.value)}
                defaultChecked={fotoLayout === "landscape"}
              />
              Landscape
            </StyledLabel>
            <StyledLabel>
              <input
                type="radio"
                name="fotoLayout"
                value="portrait"
                onChange={(e) => handleRadioChange(e.target.value)}
                defaultChecked={fotoLayout === "portrait"}
              />
              Portrait
            </StyledLabel>
            {/* {fileNewPhoto !== null && (
              <div style={{ color: "black", marginTop: "20px" }}>
                {fileNewPhoto.name}
              </div>
            )} */}
          </WrapUpload>
        </WrapData>
        <StyledButton type="submit">Spremi</StyledButton>
        <StyledButtonMob type="submit">Spremi</StyledButtonMob>
      </StyledForm>
    </WrapAll>
  );
}

export default Formular;
