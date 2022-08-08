import React, { useState } from "react";
import Button from "../../../shared/components/FormElements/Button/Button";
import UploadCsv from "../../../shared/components/FormElements/UploadFile/CSV/UploadCsv";
import DataTable from "react-data-table-component";
import './MultiRecipient.css';

const MultiRecipient = () => {
  const [rowData, setRowData] = useState([]);

  const csvUploadedHandler = (recipientsToSave) => {
    console.log('recipientsToSave :>> ', recipientsToSave);
    setRowData(recipientsToSave);
  }

  const onSubmitHandler = async () => {
    try {
      if (rowData) {
        const bodyReq = JSON.stringify({ recipients: rowData });
        const multiRecipientResponse = await fetch('http://localhost:80/api/recipients', {
          method: 'POST',
          body: bodyReq,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log('authResponse :>> ', multiRecipientResponse);
      }
    } catch (err) {
      console.log('err :>> ', err);
    }
  }

  const headers = [
    ['Nombre', 'name'], 
    ['Apellido','lastName'], 
    ['Correo electrónico', 'email']
  ];
  const headerKeys = headers.map((element) => {
    return { name: element[0], selector: row => row[element[1]], soportable: true }
  });

  return (
    <div className="multirecipient-upload__form">
      <h2> Cargar Destinatarios</h2>
      <p>Puedes cargar un archivo en formato .csv con la información de tus destinatarios.</p>
      <UploadCsv onCsvUploaded={csvUploadedHandler} />
      {
        rowData.length !== 0 &&
        <React.Fragment>
          <DataTable
            columns={headerKeys}
            data={rowData}
            defaultSortField="title"
            pagination
          />

          <Button type="submit" disabled={false} onClick={onSubmitHandler}>
            Cargar
          </Button>
        </React.Fragment>
      }
    </div>
  )
}

export default MultiRecipient;