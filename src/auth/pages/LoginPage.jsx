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
import  "../../assets/css/components/loginPage.css";
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



  return (
    <div className="contenedor">
    <div className={`pantalla1 ${isFlipped ? 'isFlipped' : ''}`}>
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
            src={logo} // Adjust the path as necessary
            alt="logo"
          />
        </a>
      </div>
      {!isFlipped ? (
        <>
          <div className="contenedorEmailPassword">
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="contenedorEmailPassword">
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={loginSubmit}
            sx={{ backgroundColor: 'white', color: 'black' }}
          >
            Iniciar sesión
          </Button>
        </>
      ) : (
        <>
          <div className="contenedorEmailPassword">
            <div className="sec-2">
              <TextField
                label="Nombre completo"
                placeholder="Nombre completo"
                fullWidth
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
                error={!!registerName === '' && formRegisterSubmitted}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="contenedorEmailPassword">
            <div className="sec-2">
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
                error={!!registerEmail === '' && formRegisterSubmitted}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="contenedorEmailPassword">
            <div className="sec-2">
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
                error={!!registerPassword === '' && formRegisterSubmitted}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="contenedorEmailPassword">
            <div className="sec-2">
              <TextField
                label="Repite contraseña"
                type="password"
                placeholder="Repite contraseña"
                fullWidth
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
                error={!!registerPassword2 === '' && formRegisterSubmitted}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={registerSubmit}
            sx={{ backgroundColor: 'white', color: 'black' }}
          >
            Crear cuenta
          </Button>
        </>
      )}
      <div className="pieDePagina">
        <span onClick={handleRegisterClick} style={{ fontSize: 16, color: 'white' }}>
          {isFlipped ? 'Iniciar sesión' : 'Registrarse'}
        </span>
      </div>
    </div>
  </div>
  );
};
