import { useDispatch } from "react-redux";
import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import { LoginOutlined, MenuOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo-dark.png";
import { useAuthStore, useAccountStore } from "../hooks";

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const { startLogout } = useAuthStore();
  const {
    inAccount,
    startGetPendingAccount,
    startGetPendingPayAccount,
    startGetPaidAccount,
    startGetCancelAccount,
  } = useAccountStore();
  const onLogout = () => {
    dispatch(startLogout());
  };

  const onAccountAll = () => {
    dispatch();
  };
  const onAccountAwait = () => {
    startGetPendingAccount();
  };

  const onAccountPending = () => {
    startGetPendingPayAccount();
  };

  const onAccountPay = () => {
    startGetPaidAccount();
  };

  const onAccountCancel = () => {
    startGetCancelAccount();
  };
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ backgroundColor: "#FCEA10" }}>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid container direction="row" alignItems="center">
          <a
            href="/"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "30%",
            }}
          >
            <img
              style={{ width: 300, alignSelf: "center" }}
              src={logo}
              alt="logo"
            />
          </a>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <span className="btn primary" onClick={onAccountAwait}>
              Por pagar
            </span>
            <span className="btn primary" onClick={onAccountPending}>
              Pendientes de pago
            </span>

            <span className="btn primary" onClick={onAccountPay}>
              Pagadas
            </span>
            <span className="btn primary" onClick={onAccountCancel}>
              Canceladas
            </span>
          </div>
          <div
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              width: "10%",
            }}
          >
            <IconButton onClick={onLogout}>
              <LoginOutlined className="iconColor" />
            </IconButton>
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
