import "./ShowNewsletter.css";
import React, { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../../shared/utils/firebase/firebase";
import Card from "../../../shared/components/UI/Card/Card";

function ShowNewsletter() {
  const [imageUrls, setImageUrls] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const imagesListRef = ref(storage, "newsletters/");

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => {
            if (prev.find((element) => element === url)) {
              return [...prev]
            } else {
              return [...prev, url]
            }
          });
        });

        getMetadata(item).then((meta) => {
          setImageNames((prev) => {
            if (prev.find((element) => element === meta.name)) {
              return [...prev]
            } else {
              return [...prev, meta.name]
            }
          })
        })
      });
    });
  }, []);

  const onSelectCard = (event) => {
    console.log('event :>> ', event.target.src);// URL
    console.log('event :>> ', event.target.alt);// NAME
  }

  return (
    <React.Fragment>
      <div className="newsletter__wrapper">
        <h2>Newsletters disponibles:</h2>
        <div className="newsletter_card__wrapper">
          {
            imageUrls.map((url, index) => {
              return (
                <div key={`wrapper_${index}`} onClick={onSelectCard}>
                  <Card key={`card_${index}`} className="newsletter__card">
                    <img className="newsletter__img" key={`img_${index}`} src={url} alt={`${imageNames[index]}`} />
                    <p key={`name_${index}`}> {imageNames[index]} </p>
                  </Card>
                </div>
              )
            })
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default ShowNewsletter;