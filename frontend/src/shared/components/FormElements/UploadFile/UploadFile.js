import "./UploadFile.css";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useState } from "react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {
  ref,
  uploadBytes
} from "firebase/storage";
import { storage } from "../../../utils/firebase/firebase";
import { v4 } from "uuid";
import Button from "../Button/Button";

const UploadFile = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const allowedFiles = ['application/pdf', 'image/png'];

  const [imageUpload, setImageUpload] = useState(null);
  const [imageToRender, setImageToRender] = useState(null);
  const [extension, setExtension] = useState('');
  const [fileName, setFileName] = useState('');

  const setFileReaderToPreview = () => {
    if (imageUpload && allowedFiles.includes(imageUpload.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(imageUpload);
      reader.onloadend = (event) => {
        setImageToRender(event.target.result)
      }
    }
  }

  const getNameAndExtensionFile = (...fileData) => {
    const fullFileName = fileData[0].name.toLowerCase().split('.');
    const fileNameFiltered = fullFileName.slice(0, fullFileName.length - 1)
    const fileExtension = fullFileName[fullFileName.length - 1].toString();
    setFileName(fileNameFiltered[0]);
    setExtension(fileExtension);
    setFileReaderToPreview();
  }

  const onUploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `newsletters/${fileName + v4()}`);
    uploadBytes(imageRef, imageUpload).then((res) => {
      console.log('res :>> ', res);
    });
  };

  return (
    <div className="upload-file__wrapper">
      <div className='upload-file__input'>
        <h2>{props.title}</h2>
        <p>Puedes cargar un archivo en formato .pdf o png.</p>
        <input
          type={"file"}
          id={"fileInput"}
          accept={".pdf, .png"}
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
            getNameAndExtensionFile(event.target.files[0])
          }} />

        <Button disabled={!imageUpload} onClick={onUploadFile}>
          Cargar newsletter
        </Button>
      </div>

      <div className='upload-file__preview'>
        <h2>Vista previa</h2>
        {imageUpload && extension === 'png' &&
          <img className="viewer" src={imageToRender} alt="Preview" />
        }

        {imageUpload && extension !== 'png' &&
          <div className="viewer">
            {imageUpload && (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                <Viewer fileUrl={imageToRender}
                  plugins={[defaultLayoutPluginInstance]}></Viewer>
              </Worker>
            )}
          </div>
        }

        {!imageUpload && <div className="viewer">No se ha cargado ningún archivo</div>}
      </div>
    </div>
  )
}

export default UploadFile;