import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

export default function Create({ setCoupons }) {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);

  const validate = Yup.object().shape({
    name: Yup.string()
      .required("Coupon  is required")
      .min(2, "Coupon must be at least 2 characters long")
      .max(30, "Coupon must be at most 30 characters long")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numbersand special characters are not allowed",
      ),
    discount: Yup.number()
      .required("Discount is required")
      .min(1, "Discount must be at least 1%")
      .max(100, "Discount must be at most 100%"),
  });

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/coupon", {
        name,
      });
      setCoupons(data.coupons);
      setName("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, discount }}
        validationSchema={validate}
        onSubmit={submitHandler}
      >
        {(form) => (
          <Form>
            <div className={styles.header}>Create a Coupon</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="Coupon Name"
              onChange={(e) => setName(e.target.value)}
            />
            <AdminInput
              type="number"
              label="Discount"
              name="discount"
              placeholder="Discount"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <div className={styles.btn_wrap}>
              <button type="submit" className={`${styles.submit_btn} `}>
                <span>Add Coupon</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
