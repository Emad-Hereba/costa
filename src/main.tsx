import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const domNode = document.getElementById("root");
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
} else {
  console.error("Element with id 'root' not found in the document.");
}