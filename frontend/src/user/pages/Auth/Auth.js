import React, { useContext, useState } from "react";
import Card from "../../../shared/components/UI/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import './Auth.css';
import { useForm } from '../../../shared/hooks/form-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import Error from "../../../shared/components/UI/Modal/Error/Error";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const loginOrSignHandler = () => {
    let formValidation;
    if (!isLogin) {
      formValidation = formState.inputs.email.isValid && formState.inputs.password.isValid;
      setFormData({ ...formState.inputs }, formValidation);
    } else {
      setFormData({ ...formState.inputs }, false);
    }
    setIsLogin(prevMode => !prevMode);
  }

  const LoginRequest = async () => {
    try {
      const bodyReq = JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      });

      const authResponse = await fetch('http://localhost:80/api/login', {
        method: 'POST',
        body: bodyReq,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('authResponse :>> ', authResponse);
      if (authResponse.status === 200) {
        auth.login(authResponse._id);
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    } catch {
      setLoginError(true);
    }
  }

  const createUserRequest = async () => {
    try {
      const bodyReq = {
        name: formState.inputs.name.value,
        lastName: formState.inputs.lastName.value,
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        isAdmin: true
      }

      const createUserRes = await fetch('http://localhost:80/api/user', {
        method: 'POST',
        body: JSON.stringify(bodyReq),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (createUserRes.status === 200) {
        auth.login(createUserRes._id);
        <Navigate to='/newsletter'></Navigate>
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    } catch {
      setLoginError(true);
    }      
  }

const authHandler = async (event) => {
  event.preventDefault();
  isLogin ? LoginRequest() : createUserRequest();
}

const onConfirmError = () => {
  setLoginError(false)
}

return (
  <div className="auth_wrapper">
    {loginError &&
      <Error title='Ocurrió un error, verifique su información' buttonText="Confirmar" onClick={onConfirmError}></Error>
    }

    <Card className='login'>
      <h2> {isLogin ? 'Iniciar Sesión' : 'Crear Usuario'}</h2>
      <form className="login__form" onSubmit={authHandler}>
        {!isLogin && (
          <Input
            id="username"
            type="text"
            label="Nombre de Usuario"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="Ej. Nicolas21"
            onInput={inputHandler}
          />
        )}
        {!isLogin && (
          <Input
            id="name"
            type="text"
            label="Nombre"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="Ej. Nicolas"
            onInput={inputHandler}
          />
        )}
        {!isLogin && (
          <Input
            id="lastName"
            type="text"
            label="Apellido"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="Ej. Cruz"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          label="Correo eletrónico"
          validators={[VALIDATOR_EMAIL()]}
          placeholder="usuario@dominio.com"
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Contraseña"
          placeholder="********"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Ingresa una contraseña válida"
          onInput={inputHandler}
        />
        {isLogin && (
          <div>
            <Button type="submit" disabled={!formState.isValid}>
              {'Iniciar Sesión'}
            </Button>
            <Button onClick={loginOrSignHandler}>
              ¿No tienes cuenta? Registrate
            </Button>
          </div>
        )}
        {!isLogin && (
          <div>
            <Button type="submit" disabled={!formState.isValid} onClick={createUserRequest}>
              Registrar
            </Button>
            <Button onClick={loginOrSignHandler}>
              Regresar
            </Button>
          </div>
        )}
      </form>
    </Card>
  </div >
)
}

export default Auth;