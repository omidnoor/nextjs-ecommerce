import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import jwt from "jsonwebtoken";

import { BiLeftArrowAlt } from "react-icons/bi";

import Footer from "@/components/footer";
import Header from "@/components/header";

import styles from "@/styles/forgot.module.scss";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import LoginInput from "@/components/inputs/loginInput";
import RingLoaderSpinner from "@/components/loaders/ringloader";
import Router from "next/router";
import { getSession, signIn } from "next-auth/react";

export default function reset({ user_id }) {
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter a new password for your account")
      .min(6, "Too short - min 6 characters")
      .max(36, "Too long - max 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });

      const options = {
        redirect: false,
        email: data.email,
        password: password,
      };

      await signIn("credentials", options);

      setError("");
      setLoading(false);
      Router.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <RingLoaderSpinner loading={loading} />}
      <Header country="Canada" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password? <Link href="/">Login instead</Link>{" "}
            </span>
          </div>
        </div>

        <div className={styles.forgot__form}>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => resetHandler()}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConf_password(e.target.value)}
                />

                <CircledIconBtn type="submit" text="Submit" />
                <div className={styles.forgot__message}>
                  {error && <span className={styles.error}>{error}</span>}
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

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  // console.log(user_id);
  return {
    props: {
      user_id: user_id.id,
    },
  };
}
