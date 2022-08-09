import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useEffect, useState } from 'react';

const PDF = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const allowedFiles = ['application/pdf'];

  useEffect(() => {
    if (props.fileImported) {
      handleFile(props.fileImported)
    }
  }, [props])

  const handleFile = () => {
    let selectedFile = props.fileImported;
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
        }
      }
      else {
        setPdfFile('');
      }
    }
  }

  return (
    <div className="viewer">
      {pdfFile && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
        </Worker>
      )}

      {!pdfFile && <>No file is selected yet</>}
    </div>
  );

}

export default PDF;
