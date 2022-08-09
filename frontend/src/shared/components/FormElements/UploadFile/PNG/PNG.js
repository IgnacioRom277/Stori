import React, { useEffect, useState } from "react";

const PNG = (props) => {
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    if (!props.fileImported) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewImg(fileReader.result);
    };
    fileReader.readAsDataURL(props.fileImported);
  }, [props]);

  return (
    <div className="viewer">
      <img src={previewImg} alt="Preview" />
    </div>
  )
}

export default PNG;