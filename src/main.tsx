import { createRoot } from "react-dom/client";
import "./index.css";
import { ContentProvider } from "./content";
import { ThemeProvider } from "./theme";
import { createElement } from "react";

const path = window.location.pathname.replace(/\/$/, "");

if (path === "/checkout") {
  import("./Checkout").then(({ default: Checkout }) => {
    createRoot(document.getElementById("root")!).render(
      createElement(ThemeProvider, null, createElement(Checkout))
    );
  });
} else {
  import("./App").then(({ default: App }) => {
    createRoot(document.getElementById("root")!).render(
      createElement(ThemeProvider, null,
        createElement(ContentProvider, null,
          createElement(App)
        )
      )
    );
  });
}
