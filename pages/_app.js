import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import store from "@/store";
import "@/styles/globals.scss";
import Head from "next/head";

let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const options = {
    "client-id": pageProps.paypal_client_id,
    currency: "CAD",
    intent: "capture",
  };

  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta name="description" content="Online shooping service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <SessionProvider session={session}>
        <Provider store={store}>
          <PayPalScriptProvider options={options}>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </PayPalScriptProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const paypal_client_id = process.env.PAYPAL_CLIENT_ID;

    return {
      props: {
        paypal_client_id,
      },
    };
  } catch (error) {
    console.error(error.message);
  }
}
