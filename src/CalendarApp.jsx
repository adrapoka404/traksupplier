import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppTheme } from "./theme";

export const CalendarApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
