import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import ToastProvider from "./providers/ToastProvider.jsx";
import { store } from "./store.js";
import Error from "./Error.jsx";

const theme = extendTheme({
  fonts: {
    body: "Open Sans, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Error>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ToastProvider />
          <App />
        </ChakraProvider>
      </Provider>
    </Error>
  </React.StrictMode>
);
