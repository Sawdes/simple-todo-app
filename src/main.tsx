import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <main className="purple-dark text-foreground bg-background min-h-screen">
        <Provider store={store}>
          <App />
        </Provider>
      </main>
    </NextUIProvider>
  </StrictMode>
);
