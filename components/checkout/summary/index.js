import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import ShippingInput from "@/components/inputs/shippingInputs";
import { applyCoupon } from "@/requests/user";

import styles from "./styles.module.scss";

export default function Summary({
  user,
  cart,
  totalAfterDiscount,
  setTotalAfterDiscount,
  paymentMethod,
  selectedAddress,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(null);
  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Coupon is required"),
  });

  const applyCouponHandler = async (formik) => {
    const res = await applyCoupon(coupon);
    if (res.success) {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError(null);
      formik.setFieldError("coupon", "");
      console.log(res);
    } else {
      setError(res.errorMessage);
      formik.setFieldError("coupon", res.errorMessage);
    }
  };

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
          onSubmit={(formik) => applyCouponHandler(formik)}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder="Coupon"
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button type="button" onClick={() => applyCouponHandler(formik)}>
                Apply
              </button>
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
                  totalAfterDiscount != "" &&
                  !error && (
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
