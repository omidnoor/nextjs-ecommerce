import { useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Router from "next/router";

import { BiLeftArrowAlt } from "react-icons/bi";

import LoginInput from "@/components/inputs/loginInput";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import RingLoaderSpinner from "@/components/loaders/ringloader";

import styles from "../styles/signin.module.scss";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};

export default function signin({ providers, callbackUrl, csrfToken }) {
  // console.log(callbackUrl, csrfToken);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

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

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Too short - min 2 characters")
      .max(16, "Too long - max 16 characters")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)",
      )
      .min(6, "Too short - min 6 characters")
      .max(36, "Too long - max 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const signInHandler = async (e) => {
    setLoading(true);

    const options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };

    const res = await signIn("credentials", options);

    setUser({ ...user, success: "", error: "" });

    setLoading(false);

    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      setUser({ ...user, error: "", success: data.message });
      setLoading(false);

      setTimeout(async () => {
        const options = {
          redirect: false,
          email: email,
          password: password,
        };

        const res = await signIn("credentials", options);
        Router.push("/");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, suucess: "", error: error.response.data.message });
    }
  };

  return (
    <>
      {loading && <RingLoaderSpinner loading={loading} />}
      <Header country="Canada" />
      <div className={styles.login}>
        {/* login container */}
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us! <Link href="/">Go to store</Link>
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
              onSubmit={() => signInHandler()}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="email"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
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

                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forget password?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") return;
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* sign up container */}
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>Get access to one of the best Eshopping services.</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => signUpHandler()}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div className={styles.error}>{error && <span>{error}</span>}</div>
            <div className={styles.success}>
              {success && <span>{success}</span>}
            </div>
          </div>
        </div>
      </div>
      <Footer country="Canada" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const { callbackUrl } = query;

  // if (session) {
  //   return {
  //     redirect: {
  //       destination: callbackUrl,
  //     },
  //   };
  // }

  const crsfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());

  return {
    props: {
      providers,
      crsfToken,
      callbackUrl,
    },
  };
}
