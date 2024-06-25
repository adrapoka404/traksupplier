import { useEffect, useState } from "react";
import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";
import Swal from "sweetalert2";
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

  return (
    <div className="container login-container">
      <div>
        <a
          href="/"
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: 300, alignSelf: "center" }}
            src={logo}
            alt="logo"
          />
        </a>
      </div>
      <div className="row">
        <div className="col-md-6 login-form-1">
          <a
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ mb: 1, alignSelf: "center" }}>
              Iniciar sesión
            </Typography>
          </a>
          <form
            onSubmit={loginSubmit}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Correo"
                  type="email"
                  placeholder="correo@google.com"
                  fullWidth
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                  error={!!loginEmail == "" && formLoginSubmitted}
                  // helperText={emailValid}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                  error={!!loginPassword == "" && formLoginSubmitted}
                  // helperText={passwordValid}
                />
              </Grid>

              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#ff8b00" }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <a
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ mb: 1, alignSelf: "center" }}>
              Crear cuenta
            </Typography>
          </a>
          <form
            onSubmit={registerSubmit}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Nombre completo"
                  placeholder="Nombre completo"
                  fullWidth
                  name="registerName"
                  value={registerName}
                  onChange={onRegisterInputChange}
                  error={!!registerName == "" && formRegisterSubmitted}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
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
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
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
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
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
              </Grid>
              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    value="Crear cuenta"
                    fullWidth
                    sx={{ backgroundColor: "#ff8b00" }}
                    variant="contained"
                  >
                    Crear cuenta
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};
