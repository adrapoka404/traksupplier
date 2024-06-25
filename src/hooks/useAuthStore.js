import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onChecking,
  onClearMessage,
  onLogin,
  onLogout,
  onPopulateUsers,
} from "../store";

export const useAuthStore = () => {
  const { status, user, users, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          admin: data.admin,
          profile: data?.profile || [],
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid, admin: data.admin }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.msg || "Error en el registro"));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          admin: data.admin,
          profile: data?.profile || [],
        })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  const startGetUsers = async () => {
    try {
      const { data } = await calendarApi.get("/users");
      dispatch(onPopulateUsers(data.usuarios));
    } catch (error) {
      console.log(error);

      // dispatch(onLogout("Error al llamar  incorrectas"));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 10);
    }
  };
  return {
    //propiedades
    status,
    user,
    users,
    errorMessage,
    //metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
    startGetUsers,
  };
};
