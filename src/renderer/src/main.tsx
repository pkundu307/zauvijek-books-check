import "@renderer/assets/fonts/rupee-foradian/Rupee_Foradian.ttf";
import "@renderer/assets/fonts/lato/Lato-Black.ttf";
import "@renderer/assets/fonts/lato/Lato-Bold.ttf";
import "@renderer/assets/fonts/lato/Lato-Light.ttf";
import "@renderer/assets/fonts/lato/Lato-Regular.ttf";
import "@renderer/assets/fonts/lato/Lato-Thin.ttf";
import "@renderer/assets/css/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";

import App from "./App";
import theme from "@renderer/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: "top",
          duration: 3000,
          variant: "subtle",
          containerStyle: {
            fontSize: "sm",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <App />
          </CookiesProvider>
        </HashRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
