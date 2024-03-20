import { UploadBlockTop, UploadBlockTopLayer, WrapAll } from "./style.js";

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
import { db } from "../../firebase/firebase.js";
import Image from "next/image.js";
import Resizer from "react-image-file-resizer";
import { storage } from "../../firebase/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Formular({ toggleModal, id, data, allData }) {
  const [mjesto, setMjesto] = useState(data.title_naslov);
  const [autor, setAutor] = useState(data.autor);
  const [email, setEmail] = useState("");
  const [godina, setGodina] = useState(data.datum_uploada);
  const [poruka, setPoruka] = useState("");
  const [file, setFile] = useState(null);
  const [fileNewPhoto, setFileNewPhoto] = useState(null);
  const [checked, setChecked] = useState(data.procjenaGodine);
  const [fotoLayout, setFotoLayout] = useState(data.fotoLayout);
  // const [image, setImage] = useState(null);
  const [fileThumb, setFileThumb] = useState(null);
  const [percent, setPercent] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [largeImage, setLargeImage] = useState(null);
  const [largeImageurl, setLargeImageUrl] = useState(data.image_url_200px);
  const [thumbImage, setThumbImage] = useState(null);
  const [thumbImageUrl, setThumbImageURL] = useState(data.image_url_1000px);
  const [URLs, setURLs] = useState([]);
  const [newPhotoURL, setNewPhotoURL] = useState(data.newPhoto);
  const [lastURLs, setlastURLs] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  console.log("Features kliknute fotke za edit", data);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objIndex = allData.findIndex((obj) => obj.id == data.id);

    const editedData = {
      Title: mjesto,
      DateCreated: godina,
      GPSLatitude: data.latitude,
      GPSLongitude: data.longitude,
      Photo1000px: thumbImageUrl,
      Photo200px: largeImageurl,
      newPhoto: newPhotoURL,
      procjenaGodine: checked,
      autor: autor,
      fotoLayout: data.fotoLayout,
      timestamp: Date.now(),
      id: data.id,
    };
    (allData[objIndex].Title = mjesto),
      (allData[objIndex].DateCreated = godina),
      (allData[objIndex].autor = autor),
      checked === undefined
        ? (allData[objIndex].procjenaGodine = false)
        : (allData[objIndex].procjenaGodine = checked);

    // const docRef = doc(db, "retroData", "RJHT2JQsp8yK52ztOn1z");
    const docRef = doc(db, "retroData5", "test");

    setDoc(docRef, { allData });
    console.log(mjesto, godina, autor, checked);
  };

  // useEffect(() => {
  //   if (thumbImageUrl !== "" && largeImageurl && fileNewPhoto === null) {
  //     const newEntry = {
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
  //     };
  //     allData.push(newEntry);
  //     const docRef = doc(db, "retroData", "RJHT2JQsp8yK52ztOn1z");
  //     setDoc(docRef, { allData });
  //     console.log("WRITTEN NO NEW PHOTO");
  //     setGodina("");
  //     setMjesto("");
  //     setAutor("");
  //     setFile(null);
  //     setFileNewPhoto(null);
  //     toggleModal();
  //   }
  //   if (thumbImageUrl !== "" && largeImageurl && newPhotoURL !== "") {
  //     const newEntry = {
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
  //     };
  //     allData.push(newEntry);
  //     const docRef = doc(db, "retroData", "RJHT2JQsp8yK52ztOn1z");
  //     setDoc(docRef, { allData });
  //     console.log("WRITTEN WITH NEW PHOTO");

  //     setGodina("");
  //     setMjesto("");
  //     setAutor("");
  //     setFile(null);
  //     setFileNewPhoto(null);
  //     toggleModal();
  //   }
  // }, [thumbImageUrl, newPhotoURL, largeImageurl]);
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

  // const uploadlargeImage = (files) => {
  //   setLoading(true);
  //   const imageLinks = [];

  //   let image = files;
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append(
  //     "upload_preset",
  //     process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  //   );
  //   data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  //   data.append("folder", "Cloudinary-React");

  //   fetch(
  //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(imageLinks);
  //       setLargeImageUrl(res.url);
  //       if (fileNewPhoto !== null) {
  //         uploadNewPhoto(fileNewPhoto);
  //       }
  //       uploadThumbPhoto(thumbImage);
  //     })
  //     .catch((err) => setLoading(false));
  // };

  // const uploadNewPhoto = (file) => {
  //   let image = file;
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append(
  //     "upload_preset",
  //     process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  //   );
  //   data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  //   data.append("folder", "Cloudinary-React");

  //   fetch(
  //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("new photo url:", res.url);

  //       setNewPhotoURL(res.url);
  //       // uploadThumbPhoto(thumbImage);
  //     });
  // };

  // const uploadThumbPhoto = (file) => {
  //   let image = file;
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append(
  //     "upload_preset",
  //     process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  //   );
  //   data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  //   data.append("folder", "Cloudinary-React");

  //   fetch(
  //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("new photo url:", res.url);

  //       setThumbImageURL(res.url);
  //     });
  // };

  // useEffect(() => {
  //   if (thumbImageUrl !== "" && largeImageurl !== "") {
  //     console.log("USE EFFE");
  //     const docRef = addDoc(collection(db, "cities"), {
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
  //     });
  //     setGodina("");
  //     setMjesto("");
  //     setAutor("");
  //     setFile(null);
  //     setFileNewPhoto(null);
  //     toggleModal();
  //   }
  // }, [thumbImageUrl, newPhotoURL, largeImageurl]);

  // const handleUpload = () => {
  //   uploadFiles(images);
  // };
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

  return (
    <WrapAll>
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
          {/* <WrapUpload>
            <StyledLabel>Upload foto</StyledLabel>
            <input type="text" value={largeImageurl} />
            <br />
            <input type="text" value={thumbImageUrl} />

            <UploadBlock type="file" onChange={handleChange} accept="image/*" />
            <StyledLabel>Upload new foto</StyledLabel>
            <input type="text" value={newPhotoURL} />

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
          </WrapUpload> */}
        </WrapData>
        <StyledButton type="submit">Spremi</StyledButton>
        <StyledButtonMob type="submit">Spremi</StyledButtonMob>
      </StyledForm>
    </WrapAll>
  );
}

export default Formular;
