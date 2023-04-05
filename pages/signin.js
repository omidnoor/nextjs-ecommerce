import Footer from "@/components/footer";
import Header from "@/components/header";
import { Form, Formik } from "formik";
import Link from "next/link";

import { BiLeftArrowAlt } from "react-icons/bi";

import styles from "../styles/signin.module.scss";
import LoginInput from "@/components/inputs/loginInput";

export default function signin() {
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
            <Formik>
              {(form) => (
                <Form>
                  <LoginInput icon="password" placeholder="password" />
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
