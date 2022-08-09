import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import {
  ref,
  uploadBytes
} from "firebase/storage";
import { storage } from "../../../utils/firebase/firebase";
import "./UploadFile.css";
import PNG from "./PNG/PNG";
import PDF from "./PDF/PDF";

const UploadFile = (props) => {
  const [fileImported, setFileImported] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const [fileName, setFileName] = useState('');

  let inputRef = useRef();

  const onUploadFileHandler = () => {
    if (fileImported == null) return;

    const imageRef = ref(storage, `newsletters/${fileName}`);
    uploadBytes(imageRef, fileImported).then((res) => {
      alert('El archivo se subió correctamente');
    });
  }

  const onFileImportedHandler = (event) => {
    const currentFile = event.target.files[0];
    setFileImported(currentFile);
    const completeName = currentFile.name.toLowerCase().split('.');
    const fileExtension = completeName[completeName.length - 1].toString();
    setFileName(currentFile.name);
    setFileExtension(fileExtension);
  }

  return (
    <div className="upload-file__wrapper">
      <div className="upload-file__input">
        <h2>{props.title}</h2>
        <p>Puedes cargar un archivo en formato .pdf o png.</p>
        <input
          ref={inputRef}
          type="file"
          id="fileInput"
          accept={".pdf, .png"}
          onChange={onFileImportedHandler} />

        <img className="file_example" src="https://firebasestorage.googleapis.com/v0/b/stori-challenge-9a98c.appspot.com/o/Upload_newsletter.png?alt=media&token=0d900de0-27f3-470b-84e5-3340ae4f0b68" alt="PDF-PNG" />
        <Button disabled={false} onClick={onUploadFileHandler}>
          Cargar newsletter
        </Button>
      </div>

      <div className="upload-file__preview">
        <h2>Vista previa</h2>
        {fileImported && fileExtension === 'png' &&
          <PNG fileImported={fileImported} />
        }

        {fileImported && fileExtension !== 'png' &&
          <PDF fileImported={fileImported} />
        }

        {!fileImported && <div className="viewer">No se ha cargado ningún archivo</div>}
      </div>
    </div>
  )
}

export default UploadFile