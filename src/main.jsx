// src/main.jsx
// ------------------------------------------------------------------
// This is the JavaScript entry point - the first file Vite loads.
//
// createRoot mounts the React app into the <div id="root"> in index.html.
// BrowserRouter enables HTML5 history-based navigation (clean URLs like
// /listings/5 instead of hash URLs like /#/listings/5).
//
// StrictMode renders components twice in development to catch bugs early.
// It has no effect in the production build.
// ------------------------------------------------------------------
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
