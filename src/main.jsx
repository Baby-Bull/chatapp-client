import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Components/Redux/store";
import { StyledEngineProvider } from '@mui/material/styles';
import { ToggleColorMode } from "./Helpers/useTheme";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <ToggleColorMode>
      <Provider store={store}>
        <ToastContainer position="top-right" />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ToggleColorMode>
  </StyledEngineProvider>
  // </React.StrictMode>
);
