import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PersonalProvider } from "./context/personalContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PersonalProvider>
      <App />
    </PersonalProvider>
  </React.StrictMode>
);
