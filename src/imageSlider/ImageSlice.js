import React, { useEffect, useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebaseConfig";

import classes from "./ImageSlice.module.styl";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const ImageSlice = (props) => {
  const inputRef = useRef();

  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);

  const fileChangeHandler = () => {
    const file = event.target.files[0];
    setFile(file);
    setUrl(null);
  };

  useEffect(() => {
    if (file) {
      setLoading(true);
      handleUpload();
    }
  }, [file]);

  useEffect(() => {
    if (url) {
      fetch(
        `https://task5-44bd5-default-rtdb.firebaseio.com/moreImages/${props.id}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            url: url,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((r) => {
        setLoading(false);
        props.finishAddingImage();
      });
    }
  }, [url]);
  const clickAddImageHandler = () => {
    inputRef.current.click();
  };
  const handleUpload = () => {
    if (!file) {
      return;
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
        });
      }
    );
  };
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={fileChangeHandler}
      />
      <div
        className={`${classes.primaryImage} ${
          classes[`position${props.position}`]
        }`}
      >
        <img src={props.url} />
        {props.add && (
          <div
            className={`${classes.helperDiv} ${
              props.position === 1 ? classes.hoverDiv : ""
            }`}
            onClick={clickAddImageHandler}
          >
            {!loading && <span>Add New Image</span>}
            {!loading && (
              <span className={classes.addImage}>
                <span>+</span>
              </span>
            )}
            {loading && (
              <div>
                <LoadingSpinner />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageSlice;
