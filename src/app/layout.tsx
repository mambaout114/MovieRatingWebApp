"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import theme from "@/styles/theme";
import { PersistGate } from "redux-persist/integration/react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
