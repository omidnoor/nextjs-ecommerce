import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";

import store from "@/store";
import "@/styles/globals.scss";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";

let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [paypalClientId, setPaypalClientId] = useState(null);

  useEffect(() => {
    const fetchPaypalClientId = async () => {
      const res = await fetch("/api/get-paypal-client-id");
      const { paypal_client_id } = await res.json();
      setPaypalClientId(paypal_client_id);
    };

    fetchPaypalClientId();
  }, []);

  // const paypal_client_id = process.env.PAYPAL_CLIENT_ID;
  const options = {
    "client-id": paypalClientId,
    currency: "CAD",
    intent: "capture",
  };

  // console.log(options);

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
          <PersistGate loading={null} persistor={persistor}>
            <PayPalScriptProvider options={options}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
