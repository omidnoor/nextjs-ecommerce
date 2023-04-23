import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import styles from "./styles.module.scss";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    iconColor: "#222",
    color: "#222",
    fontSize: "16px",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": { color: "#222" },
    "::-placeholder": { color: "#222" },
  },
  invalid: {
    iconColor: "FD010169",
    color: "FD010169",
  },
};

export default function StripeForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const elements = useElements();
  const stripe = useStripe();

  const submitHandler = async (e) => {
    console.log("submitHandler");
  };
  return (
    <div className={styles.stripe}>
      <form onSubmit={() => submitHandler()}>
        <CardElement options={CARD_OPTIONS} />
        <button type="submit">PAY</button>
        {error && <div className={styles.error}>{error.message}</div>}
      </form>
    </div>
  );
}
