import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import styles from "./styles.module.scss";
import AdminInput from "@/components/inputs/adminInput";

export default function Create() {
  const [name, setName] = useState("");

  const validate = Yup.object().shape({
    name: Yup.string()
      .required("Category name is required")
      .min(2, "Category name must be at least 2 characters long")
      .max(30, "Category name must be at most 30 characters long")
      .matches(/^[aA-zZ]/, "Numbersand special characters are not allowed"),
  });

  const submitHandler = async () => {
    console.log(name);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={validate}
        onSubmit={() => submitHandler()}
      >
        {(form) => (
          <Form>
            <div className={styles.header}>Create a Category</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="Category Name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.btn_wrap}>
              <button type="submit" className={`${styles.submit_btn} `}>
                <span>Add Category</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
