import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import styles from "./styles.module.scss";
import axios from "axios";

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

export default function StripeForm({ total, order_id }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const elements = useElements();
  const stripe = useStripe();

  const submitHandler = async (e) => {
    // e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
          amount: total,
          id,
          order_id,
        });
        if (res.data.success) {
          setSuccess(res.data.success);
          window.location.reload(false);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError(error.message);
      setLoading(false);
    }
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
