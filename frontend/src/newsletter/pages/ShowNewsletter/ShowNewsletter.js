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

function ShowNewsletter(props) {
  const [fileUrls, seFileUrls] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [fileExtensions, setFileExtensions] = useState([]);
  const fileListRef = ref(storage, "newsletters/");

  useEffect(() => {
    listAll(fileListRef).then(async (response) => {
      for (let [index, item] of response.items.entries()) {
        await getDownloadURL(item).then((url) => {
          seFileUrls((prev) => {
            if (prev.find((element) => element === url)) {
              return [...prev]
            } else {
              return [...prev, url]
            }
          });
        });

        await getMetadata(item).then((meta) => {
          setFileNames((prev) => {
            if (prev.find((element) => element === meta.name)) {
              return [...prev]
            } else {
              return [...prev, meta.name]
            }
          })

          if (fileNames <= 0) {
            setFileExtensions((prev) => {
              if (prev[index] === meta.contentType) {
                return [...prev]
              } else {
                return [...prev, meta.contentType];
              }
            })
          }
        })
     }
    });
  }, []);

  const onSelectCard = (event, id) => {
    const cardSelected = document.getElementById(id);
    cardSelected.style.border = "0.2rem solid #ff9fdc";
    const all = document.getElementsByClassName("main");
    for (let item of all) {
      const cards = document.getElementById(item.id);
      if (item.id !== id) {
        cards.style.border = "none";
      }
    }
    props.onClick(event);
  }

  return (
    <React.Fragment>
      <div className="newsletter__wrapper">
        <h2>Newsletters disponibles:</h2>
        <div className="newsletter_card__wrapper">
          {
            fileUrls.map((url, index) => {
              return (
                <div className="main" id={`img_${index}`} key={`wrapper_${index}`} onClick={(event) => { onSelectCard(event, `img_${index}`) }}>
                  <Card key={`card_${index}`} className="newsletter__card">
                    {
                      fileExtensions[index] === 'application/pdf' &&
                      <img className="newsletter__img" key={`img_${index}`} src="https://firebasestorage.googleapis.com/v0/b/stori-challenge-9a98c.appspot.com/o/PDF.png?alt=media&token=8feb0c15-1238-494d-a61e-28f8175114c1" alt={`${fileNames[index]}`} />
                    }
                    {
                      fileExtensions[index] === 'image/png' &&
                      <img id={`img_${index}`} className="newsletter__img" key={`img_${index}`} src={url} alt={`${fileNames[index]}`} />
                    }
                  </Card>
                  <p key={`name_${index}`}> {fileNames[index]}  {fileExtensions[index] }</p>
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