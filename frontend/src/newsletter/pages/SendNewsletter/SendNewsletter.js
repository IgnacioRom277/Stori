import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../../shared/components/FormElements/Button/Button";
import DataTable from "react-data-table-component";
import './SendNewsletter.css';
import ShowNewsletter from "../ShowNewsletter/ShowNewsletter";

const SendNewsletter = () => {
  const [recipients, setRecipients] = useState([]);
  const [recipientsToSend, setRecipientsToSend] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const isMounted = useRef(true);
  const recipientsToMail = useRef([]);

  useEffect(() => {
    if (recipients.length <= 0) {
      getRecipientsHandler();
    }
    return () => {
      isMounted.current = false
      recipientsToMail.current = recipientsToSend
    }
  }, [recipientsToSend, recipients]);

  const getRecipientsHandler = async () => {
    await fetch('http://localhost:80/api/recipient-list')
      .then(async (res) => {
        const data = await res.json();
        const aux = data.map((element) => {
          return {
            id: element._id,
            name: element.name,
            lastName: element.lastName,
            email: element.email
          }
        });
        setRecipients(aux);
      })
  }

  const headers = [
    ['Nombre', 'name'],
    ['Apellido', 'lastName'],
    ['Correo electrónico', 'email']
  ];
  const headerKeys = headers.map((element) => {
    return { name: element[0], selector: row => row[element[1]], soportable: true }
  });

  const conditionalRowStyles = [
    {
      when: row => row.toggleSelected,
      style: {
        userSelect: "none",
        color: "white",
        cursor: "pointer",
        border: "0.2rem solid #ff47bbcb",
        background: "#ff47bbcb"
      }
    }
  ];

  const handleRowClicked = row => {
    const updatedData = recipients.map(item => {
      if (row.id !== item.id) {
        return item;
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected
      };
    });

    setRecipientsToSend(() => updatedData.filter((element) => element.toggleSelected))
    setRecipients(updatedData);
  };

  const sendEmailToRecipients = useCallback(async () => {
    if (isSending) return
    setIsSending(true)

    try {
      if (recipientsToSend) {
        const mailResponse = await fetch('http://localhost:80/api/email', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ recipients: recipientsToSend })
        })
        setIsSending(false)
      }
    } catch (err) {
      setIsSending(false)
    }
    if (isMounted.current)
      setIsSending(false)
  }, [isSending, recipientsToSend])

  return (
    <div>
      <ShowNewsletter/>
      <div className="recipient__table">
        <h2>Selecciona algún destinatario para enviar el archivo seleccionado</h2>
        <DataTable
          columns={headerKeys}
          data={recipients}
          defaultSortField="title"
          pagination
          onRowClicked={handleRowClicked}
          conditionalRowStyles={conditionalRowStyles}
        />
        <div className="send-email__buttons">
          {
            recipientsToSend.length > 0 &&
            <Button className="send-email__button" disabled={isSending} onClick={sendEmailToRecipients} >
              Enviar Email
            </Button>
          }
        </div>
      </div>
    </div>
  )
}

export default SendNewsletter;