import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { RouteProvider } from "./router";
import { ThemeProvider } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <RouteProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RouteProvider>
  </React.StrictMode>

);

