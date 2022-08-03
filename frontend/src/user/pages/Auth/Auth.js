import React from "react";
import Card from "../../../shared/components/UI/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import './Auth.css';


const Auth = (props) => {
  return (
    <React.Fragment>
      <Card className='login'>
        <h2>Iniciar Sesión</h2>
        <form className="login__form">
          <Input
            id="inputEmail"
            type="text"
            placeholder="Correo electrónico"
          />
          <Input
            id="inputPassword"
            type="password"
            placeholder="Contraseña"
            errorText="Ingresa una contraseña válida"
          />
          <Button type="submit" disabled={false}>
            {'Iniciar Sesión'}
          </Button>
        </form>
        <p>¿No tienes cuenta? Registrate</p>
      </Card>
    </React.Fragment>
  )
}

export default Auth;