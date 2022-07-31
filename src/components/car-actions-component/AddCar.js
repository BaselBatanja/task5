import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./AddCar.module.styl";
import logoImage from "../../../asserts/picker.webp";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../firebaseConfig";
import LoadingSpinner from "../UI/LoadingSpinner";

import { useNavigate, useLocation } from "react-router-dom";
import UiContext from "../../store/ui-context";

const AddCar = (props) => {
  const [file, setFile] = useState("");
  const imageRef = useRef();
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);

  const [editCarState, setEditCarState] = useState(null);

  const [id, setId] = useState(null);

  const navigator = useNavigate();
  const nameRef = useRef();
  const costRef = useRef();
  const detailsRef = useRef();

  const ctx = useContext(UiContext);
  const editCar = new URLSearchParams(location.search).get("editCar");

  useEffect(() => {
    if (editCar === "true") {
      setEditCarState(true);
      nameRef.current.value = props.data.name;
      costRef.current.value = props.data.cost;
      detailsRef.current.value = props.data.details;
      setId(props.data.id);
    }
  }, [editCar]);

  const changeFileHandler = (event) => {
    const file = event.target.files[0];

    setFile(file);
    setUrl(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const number = costRef.current.value;
    const details = detailsRef.current.value;

    if (name !== "" && number !== "" && number > 0 && details !== "" && file) {
      setLoading(true);
      handleUpload();
    }
  };

  useEffect(() => {
    if (url) {
      const name = nameRef.current.value;
      const number = costRef.current.value;
      const details = detailsRef.current.value;
      if (
        name !== "" &&
        number !== "" &&
        number > 0 &&
        details !== "" &&
        file
      ) {
        if (editCarState !== null) {
          fetch(
            `https://task5-44bd5-default-rtdb.firebaseio.com/cars/${id}.json`,
            {
              method: "PUT",
              body: JSON.stringify({
                nameOfCar: name,
                costPerDay: number,
                details,
                url,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then((r) => {
            if (r.ok) {
              setLoading(false);
              // props.loading(false);
              clickCancelButton();
              navigator(location.pathname, { replace: true });
              ctx.toggleUpdate(true);
            }
          });
        } else {
          fetch("https://task5-44bd5-default-rtdb.firebaseio.com/cars.json", {
            method: "POST",
            body: JSON.stringify({
              nameOfCar: name,
              costPerDay: number,
              details,
              url,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((r) => {
            if (r.ok) {
              setLoading(false);
              props.loading(false);
              clickCancelButton();
              navigator(location.pathname, { replace: true });
              ctx.toggleUpdate(true);
            }
          });
        }
      }
    }
  }, [url]);

  const clickCancelButton = () => {
    if (!loading) props.clearClicked();
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

        setPercent(percent);
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
    <div className={classes.addCar}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.heading}>
          <h2>{editCarState ? "Edit Car" : "Add New Car"}</h2>
        </div>
        <div className={classes.name}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" minLength="1" ref={nameRef} />
        </div>
        <div className={classes.costPerDay}>
          <label htmlFor="number">Cost Per Day</label>
          <input type="number" id="number" ref={costRef} />
        </div>
        <div className={classes.imageUploading}>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            style={{ display: "none" }}
            ref={imageRef}
            onChange={changeFileHandler}
            id="uploadImage"
          />
          <button
            id="image"
            className={classes.imageButton}
            onClick={() => {
              imageRef.current.click();
            }}
            type="button"
          >
            <div className={classes.nameOfFile}>{file?.name}</div>
            <div className={classes.pickerImage}>
              <img src={logoImage} className={classes.pickerImageImage} />
            </div>
          </button>
        </div>
        <div className={classes.details}>
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            className={classes.textA}
            maxLength="100"
            ref={detailsRef}
          />
        </div>
        <div className={classes.actions}>
          {!loading && (
            <button className={classes.add} id="addEditButton">
              {editCarState ? "Edit" : "Add"}
            </button>
          )}
          {!loading && (
            <button
              className={classes.cancel}
              type="button"
              onClick={clickCancelButton}
            >
              Cancel
            </button>
          )}
          {loading && <LoadingSpinner />}
        </div>
      </form>
    </div>
  );
};

export default AddCar;
