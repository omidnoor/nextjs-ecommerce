import Link from "next/link";

import { IoLocationSharp } from "react-icons/io5";

import styles from "./styles.module.scss";

const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
];

export default function Copyright({ country }) {
  return (
    <div className={styles.footer__copyright}>
      <section>&copy;2023 SHOPPAY ALL RIGHT RESERVED.</section>
      <section>
        <ul>
          {data.map((link, index) => (
            <li key={index}>
              <Link key={link.name} href={link.link}>
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <a href="">
              <IoLocationSharp /> {country.name}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
