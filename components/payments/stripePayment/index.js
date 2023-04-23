import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";

import styles from "./styles.module.scss";

export default function StripePayment({ total, order_id, stripe_public_key }) {
  const srtipePromise = loadStripe(stripe_public_key);
  return (
    <Elements stripe={srtipePromise}>
      <StripeForm total={total} order_id={order_id} />
    </Elements>
  );
}
