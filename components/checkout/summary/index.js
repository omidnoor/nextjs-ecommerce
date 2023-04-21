import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import ShippingInput from "@/components/inputs/shippingInputs";

import styles from "./styles.module.scss";

export default function Summary({
  user,
  cart,
  totalAfterDiscount,
  paymentMethod,
  selectedAddress,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(false);
  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Coupon is required"),
  });

  const applyCouplonHandler = async () => {};

  const placeOrderHandler = async () => {};

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            coupon,
          }}
          validationSchema={validateCoupon}
          onSubmit={() => applyCouplonHandler()}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder="Coupon"
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button type="submit">Apply</button>
              <div className={styles.info}>
                <span>
                  Total : <b>CAD {cart.cartTotal}$</b>
                </span>
                {discount != 0 && (
                  <span>
                    Coupon applied : <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount < cart.cartTotal &&
                  totalAfterDiscount != "" && (
                    <span>
                      Total after discount : <b>CAD {totalAfterDiscount}$</b>
                    </span>
                  )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button className={styles.submit_btn} onClick={() => placeOrderHandler}>
        Place Order
      </button>
    </div>
  );
}
