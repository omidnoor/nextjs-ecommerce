import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import ShippingInput from "@/components/inputs/shippingInputs";
import { applyCoupon } from "@/requests/user";

import styles from "./styles.module.scss";
import axios from "axios";

export default function Summary({
  user,
  cart,
  totalAfterDiscount,
  setTotalAfterDiscount,
  paymentMethod,
  selectedAddress,
}) {
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(null);
  const [errorOrder, setErrorOrder] = useState(null);
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
      // console.log(res);
    } else {
      setDiscount(null);
      setError(res.errorMessage);
      formik.setFieldError("coupon", res.errorMessage);
    }
  };

  const placeOrderHandler = async () => {
    try {
      if (!paymentMethod)
        return setErrorOrder("Please select a payment method");
      if (!selectedAddress) return setErrorOrder("Please select an address");

      const data = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount != "" ? totalAfterDiscount : cart.cartTotal,
      });
      setErrorOrder(null);
      router.push(`/order/${data.data.order_id}`);
    } catch (error) {
      setErrorOrder(error.response.data.message);
    }
  };

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
                {discount > 0 && (
                  <span className={styles.discount}>
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
      <button className={styles.submit_btn} onClick={() => placeOrderHandler()}>
        Place Order
      </button>
      {errorOrder && <p className={styles.error}>{errorOrder}</p>}
    </div>
  );
}
