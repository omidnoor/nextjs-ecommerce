import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

import styles from "./styles.module.scss";

export default function Create({ setCategories }) {
  const [name, setName] = useState("");

  const validate = Yup.object().shape({
    name: Yup.string()
      .required("Category name is required")
      .min(2, "Category name must be at least 2 characters long")
      .max(30, "Category name must be at most 30 characters long")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numbersand special characters are not allowed",
      ),
  });

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/category", {
        name,
      });
      setCategories(data.categories);
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
