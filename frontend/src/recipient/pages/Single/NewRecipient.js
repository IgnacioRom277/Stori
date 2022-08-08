import React, { useState } from "react";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import './NewRecipient.css'
import { useForm } from "../../../shared/hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import Error from "../../../shared/components/UI/Modal/Error/Error";

const NewRecipient = () => {
  const [recipientCreated, setRecipientCreated] = useState(true);

  const onCreateRecipientsHandler = async () => {
    try {
      const bodyReq = JSON.stringify({
        name: formState.inputs.inputRecipientName.value,
        lastName: formState.inputs.inputRecipientLastName.value,
        email: formState.inputs.inputRecipientEmail.value
      });

      const authResponse = await fetch('http://localhost:80/api/recipient', {
        method: 'POST',
        body: bodyReq,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (authResponse.status === 200) {
        alert('Usuario creado correctamente')
        setRecipientCreated(true);
      } else {
        setRecipientCreated(false);
      }
    } catch (err) {
      setRecipientCreated(false);
    }
  }

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: '', isValid: false },
      lastName: { value: '', isValid: false },
      email: { value: '', isValid: false },
    },
    false
  );

  const onConfirmError = () => {
    setRecipientCreated(true);
  }

  return (
    <React.Fragment>
      {!recipientCreated &&
        <Error title='Ocurrió un error, intente de nuevo' buttonText="Confirmar" onClick={onConfirmError}></Error>
      }
      <div className="recipient-register__form">
        <h2> Crear Destinatario</h2>
        <Input
          id="inputRecipientName"
          type="text"
          label="Nombre"
          placeholder="Bruce"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="inputRecipientLastName"
          type="text"
          label="Apellido"
          placeholder="Wayne"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="inputRecipientEmail"
          type="email"
          label="Email"
          placeholder="bruce.wayne@gotham.com"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={false} onClick={onCreateRecipientsHandler}>
          {'Confirmar'}
        </Button>
      </div>
    </React.Fragment>
  )
}

export default NewRecipient;