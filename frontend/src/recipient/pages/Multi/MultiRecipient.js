import React, { useState } from "react";
import Button from "../../../shared/components/FormElements/Button/Button";
import UploadCsv from "../../../shared/components/FormElements/UploadFile/CSV/UploadCsv";
import TableList from "../../../shared/components/UI/TableList/TableList";
import './MultiRecipient.css';

const MultiRecipient = () => {
  const [rowData, setRowData] = useState([]);

  const csvUploadedHandler = (recipientsToSave) => {
    setRowData(recipientsToSave);
  }

  const onSubmitHandler = () => {
    // TODO Register data
  }

  const headerKeys = Object.keys(Object.assign({}, ...rowData)).map(e => e.toLocaleUpperCase());

  return (
    <div className="multirecipient-upload__form">
      <h2> Cargar Destinatarios</h2>
      <p>Puedes cargar un archivo en formato .csv con la información de tus destinatarios.</p>
      <UploadCsv onCsvUploaded={csvUploadedHandler} />
      {
        rowData.length !== 0 &&
        <React.Fragment>
          <TableList
            className="multirecipient-upload__table"
            resume="Los siguientes usuarios serán registrados:"
            rowKey="header"
            headers={headerKeys}
            data={rowData}
          />
          <form>
            <Button type="submit" disabled={false} onClick={onSubmitHandler}>
              {'Cargar'}
            </Button>
          </form>
        </React.Fragment>
      }
    </div>
  )
}

export default MultiRecipient;