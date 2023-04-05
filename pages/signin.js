import { useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

import { BiLeftArrowAlt } from "react-icons/bi";

import styles from "../styles/signin.module.scss";
import LoginInput from "@/components/inputs/loginInput";
import CircledIconBtn from "@/components/buttons/circledIconBtn";

const initialValues = {
  login_email: "",
  login_password: "",
};

export default function signin() {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email is required")
      .email("Invalid email"),
    login_password: Yup.string().required("Password is required"),
  });

  return (
    <>
      <Header country="Canada" />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us! <Link href="/">Go to store</Link>{" "}
            </span>
          </div>

          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to one of teh best Eshopping services.</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="email"
                    name="login_email"
                    icon="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />

                  <div className={styles.forgot}>
                    <Link href="/forget">Forget password?</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="Canada" />
    </>
  );
}
