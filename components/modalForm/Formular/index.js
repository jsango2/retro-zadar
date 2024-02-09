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
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Image from "next/image.js";
import Resizer from "react-image-file-resizer";
import { storage } from "../../firebase/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function Formular({ lng, lat, toggleModal }) {
  const [mjesto, setMjesto] = useState("");
  const [email, setEmail] = useState("");
  const [godina, setGodina] = useState("");
  const [poruka, setPoruka] = useState("");
  const [file, setFile] = useState(null);
  const [fileNewPhoto, setFileNewPhoto] = useState(null);
  // const [image, setImage] = useState(null);
  const [fileThumb, setFileThumb] = useState(null);
  const [percent, setPercent] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [URLs, setURLs] = useState([]);
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [lastURLs, setlastURLs] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // uploadFiles(selectedImages);

    uploadFiles(selectedImages);
  };
  const uploadFiles = (files) => {
    setLoading(true);
    const imageLinks = [];
    for (let i = 0; i < files.length; i++) {
      let image = files[i];
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
          imageLinks.push(res.url);
          console.log(imageLinks);
          setURLs((oldArray) => [...oldArray, res.url]);
          if (fileNewPhoto !== null) {
            uploadNewPhoto(fileNewPhoto);
          }
        })
        .catch((err) => setLoading(false));
    }
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
      });
  };

  // const uploadToFirebase = () => {
  //   const docRef = addDoc(collection(db, "cities"), {
  //     Title: mjesto,
  //     DateCreated: godina,
  //     GPSLatitude: lat,
  //     GPSLongitude: lng,
  //     Photo1000px: URLs[0],
  //     Photo200px: URLs[2],
  //     Photo50px: URLs[1],
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  //   setGodina("");
  //   setMjesto("");
  //   setFile(null);
  // };

  // console.log("UUURRRLLLSSSS", URLs);
  // let array = new Array;
  // var fetches = [];
  // for (let i = 0; i < url.length; i++) {
  //   console.log(url[i]);
  //   fetches.push(
  //     fetch(url[i])
  //     .then(res => {return res.text(); })
  //     .then(res => {
  //           let reg = /\<meta name="description" content\=\"(.+?)\"/;
  //           res = res.match(reg);
  //           array.push(res);
  //           console.log(res);
  //         }
  //     )
  //     .catch(status, err => {return console.log(status, err);})
  //   );
  // }
  // Promise.all(fetches).then(function() {
  //   console.log (array.length);
  // });

  // let image = files[i];
  // const data = new FormData();
  // data.append("file", image);
  // data.append(
  //   "upload_preset",
  //   process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  // );
  // data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  // data.append("folder", "Cloudinary-React");

  // try {
  //   const response = await fetch(
  //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   );
  //   const res = await response.json();
  //   imageLinks.push(res.url);
  //   // setUrl(imageLinks);
  //   setLoading(false);
  //   setUrl(imageLinks);
  //   console.log("IMG LINKS LENGTH", imageLinks.length);
  //   imageLinks.length === 3 && uploadToFirebase();
  // } catch (error) {
  //   setLoading(false);
  // }
  console.log(URLs.length, newPhotoURL);
  useEffect(() => {
    if (URLs.length > 1 && newPhotoURL !== "") {
      console.log("USE EFFE");
      const docRef = addDoc(collection(db, "cities"), {
        Title: mjesto,
        DateCreated: godina,
        GPSLatitude: lat,
        GPSLongitude: lng,
        Photo1000px: URLs[0],
        Photo200px: URLs[1],
        newPhoto: newPhotoURL,
      });
      console.log("Document written with ID: ", docRef.id);
      setGodina("");
      setMjesto("");
      setFile(null);
      setFileNewPhoto(null);
      toggleModal();
    }
  }, [URLs, newPhotoURL]);

  // const handleUpload = () => {
  //   uploadFiles(images);
  // };
  const handleMjesto = (e) => {
    setMjesto(e.target.value);
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
          </SmallBlock>
          <WrapUpload>
            <StyledLabel>Upload foto</StyledLabel>
            <UploadBlock type="file" onChange={handleChange} accept="image/*" />
            {file !== null && (
              <div style={{ color: "black", marginTop: "20px" }}>
                {file.name}
              </div>
            )}
            <StyledLabel>Upload new foto</StyledLabel>
            <UploadBlock
              type="file"
              onChange={handleChangeNewPhoto}
              accept="image/*"
            />
            {fileNewPhoto !== null && (
              <div style={{ color: "black", marginTop: "20px" }}>
                {fileNewPhoto.name}
              </div>
            )}
          </WrapUpload>
        </WrapData>
        <StyledButton type="submit">Spremi</StyledButton>
        <StyledButtonMob type="submit">Spremi</StyledButtonMob>
      </StyledForm>
    </WrapAll>
  );
}

export default Formular;
