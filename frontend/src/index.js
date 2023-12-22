import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "bootstrap-icons/font/bootstrap-icons.min.css";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: "#FE7144"
      }
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('app-container'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
