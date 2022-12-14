import React, { useState } from "react";
import Button from "../../Button/Button";
import './UploadCsv.css';

const UploadCsv = (props) => {
  const [file, setFile] = useState();
  const fileReader = new FileReader();

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  }

  const onSubmitHandler = () => {
    if (file) {
      fileReader.onload = (event) => {
        csvFileToArray(event.target.result);
      }

      fileReader.readAsText(file);
    }
  }

  const csvFileToArray = string => {
    const headers = string.slice(0, string.indexOf("\n")).trim().split(",");
    const rows = string.slice(string.indexOf("\n") + 1).trim().split("\r\n");
    const rowsFiltered = rows.filter((element) => element !== '');

    const rowsData = rowsFiltered.map(row => {
      const values = row.split(",");
      const rowDataObj = headers.reduce((element, header, index) => {
        element[header] = values[index];
        return element;
      }, {});
      return rowDataObj;
    });

    props.onCsvUploaded(rowsData);
  };

  return (
    <div className="csv-input__wrapper">
      { !file &&
      <div>
        <img alt="csv_example" src="https://firebasestorage.googleapis.com/v0/b/stori-challenge-9a98c.appspot.com/o/CsvExample.PNG?alt=media&token=628f9a01-c3fb-45bc-8b29-3451023ddaea" />
      </div>
      }
      <div className="csv-input-file__wrapper">
        <form >
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={onChangeHandler} />
        </form>

        <Button
          className="csv-input__button"
          type="submit"
          disabled={!file}
          onClick={onSubmitHandler}>
          Procesar archivo
        </Button>
      </div>
    </div>
  )
}

export default UploadCsv;