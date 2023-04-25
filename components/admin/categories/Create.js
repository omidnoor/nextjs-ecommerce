import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import styles from "./styles.module.scss";
import AdminInput from "@/components/inputs/adminInput";

export default function Create() {
  const [name, setName] = useState("");

  const validate = Yup.object().shape({
    name: Yup.string().required("Required"),
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
            <button
              type="submit"
              className={`${styles.submit_btn} ${styles.submit_btn__primary}`}
            >
              <span>Add Category</span>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
