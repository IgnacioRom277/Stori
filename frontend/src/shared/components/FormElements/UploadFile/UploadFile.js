import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import {
  ref,
  uploadBytes
} from "firebase/storage";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { storage } from "../../../utils/firebase/firebase";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import "./UploadFile.css";

const UploadFile = (props) => {
  const [fileImported, setFileImported] = useState('');
  const [previewFileImg, setPreviewFileImg] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const [fileName, setFileName] = useState('');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  let inputRef = useRef();

  useEffect(() => {
    const allowedFiles = ['application/pdf'];
    if (!fileImported) {
      return;
    }

    if (fileImported.type === 'application/pdf') {
      if (fileImported) {
        if (fileImported && allowedFiles.includes(fileImported.type)) {
          const reader = new FileReader();
          reader.onloadend = (e) => {
            setPreviewFileImg(e.target.result);
          }
          reader.readAsDataURL(fileImported);
        }
      } else {
        setFileImported('')
      }
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewFileImg(fileReader.result);
      };
      fileReader.readAsDataURL(fileImported);
    }
  }, [fileImported, fileExtension, fileName]);

  const onUploadFileHandler = () => {
    if (fileImported == null) return;

    const imageRef = ref(storage, `newsletters/${fileName}`);
    uploadBytes(imageRef, fileImported).then((res) => {
      // PENDIENTE ACTUALIZAR LA BD DE NEWSLETTER
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
      <div className='upload-file__input'>
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

      <div className='upload-file__preview'>
        <h2>Vista previa</h2>
        {fileImported && fileExtension === 'png' &&
          <img className="viewer" src={previewFileImg} alt="Preview" />
        }

        {fileImported && fileExtension !== 'png' &&
          <div className="viewer">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              <Viewer fileUrl={previewFileImg}
                plugins={[defaultLayoutPluginInstance]}></Viewer>
            </Worker>
          </div>
        }

        {!fileImported && <div className="viewer">No se ha cargado ningún archivo</div>}
      </div>
    </div>
  )
}

export default UploadFile