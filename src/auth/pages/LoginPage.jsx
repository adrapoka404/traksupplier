import { useEffect, useState } from "react";
import { useAuthStore, useForm } from "../../hooks";
import styled from '@emotion/styled';
import Swal from "sweetalert2";
import { css } from '@emotion/react';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../assets/img/logo-dark.png";
const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formLoginSubmitted, setFormLoginSubmitted] = useState(false);
  const [formRegisterSubmitted, setFormRegisterSubmitted] = useState(false);

  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const registerSubmit = (event) => {
    event.preventDefault();
    setFormRegisterSubmitted(true);
    if (
      registerName == "" ||
      registerEmail == "" ||
      registerPassword == "" ||
      registerPassword2 == ""
    ) {
      Swal.fire(
        "Autenticación",
        "Favor de llenar todos los datos del formulario",
        "error"
      );
      return;
    }

    if (registerPassword !== registerPassword2) {
      Swal.fire("Autenticación", "Las contraseñas no coinciden", "error");
      return;
    }
    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    setFormLoginSubmitted(true);

    if (loginEmail == "" || loginPassword == "") {
      Swal.fire(
        "Autenticación",
        "Favor de llenar todos los datos del formulario",
        "error"
      );

      return;
    }

    startLogin({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  const handleRegisterClick = () => {
    setIsFlipped(!isFlipped);
  };

  const Contenedor = styled.div`
font-family: 'Poppins', sans-serif;
user-select: none;
overflow-y: hidden;
display: flex;
justify-content: center;
align-items: center;
background: hsl(218deg 50% 91%);
height: 100vh;
`;

  const Pantalla1 = styled.div`
background: #ff8b00;
padding: 2em;
display: flex;
flex-direction: column;
border-radius: 30px;
box-shadow: 0 0 2em hsl(231deg 62% 94%);
gap: 2em;
transition: transform 0.6s;
transform-style: preserve-3d;
perspective: 1000px;

${(props) =>
      props.isFlipped &&
      css`
    transform: rotateY(360deg);
  `}
`;

  const ContenedorEmailPassword = styled.div`
background: hsl(0deg 0% 100%);
padding: 1em;
display: flex;
flex-direction: column;
gap: 0.5em;
border-radius: 20px;
color: hsl(0deg 0% 30%);
`;

  const PieDePagina = styled.div`
display: flex;
font-size: 0.7em;
color: hsl(0deg 0% 37%);
gap: 14em;
padding-bottom: 10em;
span {
  cursor: pointer;
}
`;

  return (<Contenedor>
    <Pantalla1 isFlipped={isFlipped}>
      <div>
        <a
          href="/"
          style={{
            alignItems: 'center',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <img
            style={{ width: 300, alignSelf: 'center' }}
            src={logo}
            alt="logo"
          />
        </a>
      </div>
      {!isFlipped ? (
        <>
          <ContenedorEmailPassword>
            <div className="sec-2">
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
                error={!!loginEmail === '' && formLoginSubmitted}
              />
            </div>
          </ContenedorEmailPassword>
          <ContenedorEmailPassword>
            <div className="sec-2">
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
                error={!!loginPassword === '' && formLoginSubmitted}
              />
            </div>
          </ContenedorEmailPassword>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#ff8b00' }}
          >
            Iniciar sesión
          </Button>
        </>
      ) : (
        <>
          <ContenedorEmailPassword>
            <div className="sec-2">
              <TextField
                label="Nombre completo"
                placeholder="Nombre completo"
                fullWidth
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
                error={!!registerName == "" && formRegisterSubmitted}
              />
            </div>
          </ContenedorEmailPassword>
          <ContenedorEmailPassword>
            <div className="sec-2">
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
                error={!!registerEmail == "" && formRegisterSubmitted}
              />
            </div>
          </ContenedorEmailPassword>
          <ContenedorEmailPassword>
            <div className="sec-2">
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
                error={!!registerPassword == "" && formRegisterSubmitted}
              />
            </div>
          </ContenedorEmailPassword>
          <ContenedorEmailPassword>
            <div className="sec-2">
              <TextField
                label="Repite contraseña"
                type="password"
                placeholder="Repite contraseña"
                fullWidth
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
                error={!!registerPassword2 == "" && formRegisterSubmitted}
              />
            </div>
          </ContenedorEmailPassword>
          <Button
            type="submit"
            value="Crear cuenta"
            fullWidth
            sx={{ backgroundColor: "#ff8b00" }}
            variant="contained"
          >
            Crear cuenta
          </Button>
        </>
      )}
      <PieDePagina>
        <span onClick={handleRegisterClick}>
          {isFlipped ? 'Iniciar sesión' : 'Registrarse'}
        </span>
        <span>¿Olvidaste tu contraseña?</span>
      </PieDePagina>
    </Pantalla1>
  </Contenedor>
  );
};
