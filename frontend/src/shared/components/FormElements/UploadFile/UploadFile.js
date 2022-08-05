import Button from '../Button/Button';
import { useState } from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { storage } from '../../../utils/firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './UploadFile.css'

const UploadFile = (props) => {
  let selectedFile;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const allowedFiles = ['application/pdf', 'image/png'];

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [extension, setExtension] = useState('');
  const [errorFile, setErrorFile] = useState('');

  const fileHandler = (event) => {
    selectedFile = event.target.files[0];

    if (selectedFile && allowedFiles.includes(selectedFile.type)) {
      let reader = new FileReader();

      reader.readAsDataURL(selectedFile);
      reader.onloadend = (event) => {
        const completeFileName = selectedFile.name.toLowerCase().split('.');
        setErrorFile('');
        setFile(event.target.result);
        setFileName(completeFileName.slice(0, completeFileName.length - 1));
        setExtension(completeFileName[completeFileName.length - 1]);
      }
    } else {
      setErrorFile('Archivo no válido, selecciona un .pdf o .png');
      setFile('');
    }
  }

  const onSubmitHandler = (event) => {
    const imageRef = ref(storage, `newsletter/${fileName + '_&' + v4()}`)
    uploadBytes(imageRef, fileName).then(() => {
      console.log('Image uploaded');
    })
  }

  return (
    <div className="upload-file__wrapper">
      <div className='upload-file__input'>
        <h2>{props.title}</h2>
        <p>Puedes cargar un archivo en formato .pdf o png.</p>
        <form>
          <input
            type={"file"}
            id={"fileInput"}
            accept={".pdf, .png"}
            onChange={fileHandler} />

          {errorFile && <span className='text-danger'>{errorFile}</span>}
        </form>

        <Button type="submit" disabled={!file} onClick={onSubmitHandler}>
          Cargar newsletter
        </Button>
      </div>

      <div className='upload-file__preview'>
        <h2>Vista previa</h2>
        {file && extension === 'png' &&
          <img className="viewer" src={file} alt="Preview" />
        }

        {file && extension !== 'png' &&
          <div className="viewer">
            {file && (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                <Viewer fileUrl={file}
                  plugins={[defaultLayoutPluginInstance]}></Viewer>
              </Worker>
            )}
          </div>
        }

        {!file && <div className="viewer">No se ha cargado ningún archivo</div>}

      </div>
    </div>
  );
}

export default UploadFile;