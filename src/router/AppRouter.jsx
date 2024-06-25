import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth";
// import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { HomePage } from "../components/HomePage";
import { AccountPage } from "../account/pages/AccountPage";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  // const authStatus = "not-authenticated"; //"not-authenticated"; //
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <>
   
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<HomePage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<AccountPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
    </>
  );
};
