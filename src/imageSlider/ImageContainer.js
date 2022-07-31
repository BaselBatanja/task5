import React, { useContext, useEffect, useState } from "react";

import classes from "./ImageContainer.module.styl";

import rightArrow from "../../asserts/right.webp";
import leftArrow from "../../asserts/left.webp";
import ImageSlice from "./ImageSlice";
import AuthContext from "../store/authentication-context";

const ImageContainer = (props) => {
  const ctx = useContext(AuthContext);

  const [s, setS] = useState([]);
  const [arrayOfUrls, setArrayOfUrls] = useState([]);

  const forwardHandler = () => {
    setS((prev) => {
      const newArr = [...prev];
      const c = newArr.pop();
      newArr.unshift(c);
      return newArr;
    });
  };

  const backHandler = () => {
    setS((prev) => {
      const newArr = [...prev];
      const c = newArr.shift();
      newArr.push(c);
      return newArr;
    });
  };

  const urlurl =
    "https://firebasestorage.googleapis.com/v0/b/task5-44bd5.appspot.com/o/files%2Fcar__2_-removebg-preview.png?alt=media&token=197261ea-fd1f-4667-b732-41c9bd9aaab8";

  const fetchImages = () => {
    fetch(
      `https://task5-44bd5-default-rtdb.firebaseio.com/moreImages/${props.id}.json`
    )
      .then((r) => r.json())
      .then((d) => {
        const arr = [];
        for (const s in d) {
          arr.push(d[s].url);
        }
        const fullArray = [props.url, ...arr];
        if (fullArray.length < 5 && ctx.isAdmin) {
          fullArray.push(urlurl);
        }
        setArrayOfUrls([...fullArray]);
        for (let i = 0; i < fullArray.length; i++) fullArray[i] = i + 1;
        setS([...fullArray]);
      });
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const finishAddingImageHandler = () => {
    fetchImages();
  };
  return (
    <>
      <div id="slider" className={classes.slider}>
        {arrayOfUrls.map((element, i) => {
          if (element === urlurl && ctx.isAdmin) {
            return (
              <ImageSlice
                key={i}
                position={s[i]}
                url={element}
                add={true}
                id={props.id}
                finishAddingImage={finishAddingImageHandler}
              />
            );
          }
          return (
            <ImageSlice key={i} position={s[i]} url={element} add={false} />
          );
        })}

        <button className={classes.reverse} onClick={backHandler}>
          <img src={leftArrow} />
        </button>
        <button className={classes.forward} onClick={forwardHandler}>
          <img src={rightArrow} />
        </button>
      </div>
    </>
  );
};

export default ImageContainer;
