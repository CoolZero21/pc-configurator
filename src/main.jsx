import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";
import { CompProvider } from "./contexts/CompContext.jsx";

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <CompProvider>
      <App />
    </CompProvider>
  </DataProvider>
);
