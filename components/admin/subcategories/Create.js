import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
import SinglularSelect from "@/components/selects/SinglularSelect";

import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

export default function Create({ setSubcategories, categories }) {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  console.log(parent);

  const validate = Yup.object().shape({
    name: Yup.string()
      .required("subCategory name is required")
      .min(2, "subCategory name must be at least 2 characters long")
      .max(30, "subCategory name must be at most 30 characters long")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numbersand special characters are not allowed",
      ),
    parent: Yup.string().required("Please select a category"),
  });

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/subcategory", {
        name,
        parent,
      });
      setSubcategories(data.subcategories);
      setName("");
      setParent("");
      console.log("Categories updated in Create:", data.categories);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, parent }}
        validationSchema={validate}
        onSubmit={submitHandler}
      >
        {(form) => (
          <Form>
            <div className={styles.header}>Create a Category</div>
            <AdminInput
              type="text"
              label="subCategory"
              name="name"
              placeholder="SubCategory Name"
              onChange={(e) => setName(e.target.value)}
            />
            <SinglularSelect
              name="parent"
              value={parent}
              data={categories}
              onChangeHandler={(e) => setParent(e.target.value)}
              placeholder="Select category"
            />
            <div className={styles.btn_wrap}>
              <button type="submit" className={`${styles.submit_btn} `}>
                <span>Add subCategory</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
