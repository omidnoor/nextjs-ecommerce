import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { BiLeftArrowAlt } from "react-icons/bi";

import Footer from "@/components/footer";
import Header from "@/components/header";

import styles from "@/styles/forgot.module.scss";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import LoginInput from "@/components/inputs/loginInput";
import RingLoaderSpinner from "@/components/loaders/ringloader";

export default function forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValidation = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", { email });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <RingLoaderSpinner loading={loading} />}
      <Header country="Canada" />
      <div className={styles.forgot}>
        <div className={styles.forgot__header}>
          <div className={styles.back__svg}>
            <BiLeftArrowAlt />
          </div>
          <span>
            Forgot your password? <Link href="/">Login instead</Link>{" "}
          </span>
        </div>

        <div className={styles.forgot__form}>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => forgotHandler()}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <CircledIconBtn type="submit" text="Send link" />
                <div className={styles.forgot__message}>
                  {error && <span className={styles.error}>{error}</span>}
                  {success && <span className={styles.success}>{success}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="Canada" />
    </>
  );
}
