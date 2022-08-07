import React from "react";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import './NewRecipient.css'

const NewRecipient = () => {
  return (
    <div className="recipient-register__form">
      <h2> Crear Destinatarios</h2>
      <form>
        <Input
          id="inputRecipientName"
          type="text"
          label="Nombre"
          placeholder="Bruce"
        />
        <Input
          id="inputRecipientLastName"
          type="text"
          label="Apellido"
          placeholder="Wayne"
        />
        <Input
          id="inputRecipientEmail"
          type="text"
          label="Email"
          placeholder="bruce.wayne@gotham.com"
        />
        <Button type="submit" disabled={false}>
          {'Confirmar'}
        </Button>
      </form>
    </div>
  )
}

export default NewRecipient;