import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { RouteProvider } from "./router";
import { ThemeProvider } from "./theme";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <RouteProvider>
      <ThemeProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </ThemeProvider>
    </RouteProvider>
  </React.StrictMode>

);

