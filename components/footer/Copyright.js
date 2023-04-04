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

export default function Copyright() {
  return (
    <div className={styles.footer__copyright}>
      <section>&copy;2023 SHOPPAY ALL RIGHT RESERVED.</section>
      <section>
        <ul>
          {data.map((link) => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}

          <li>
            <a href="">
              <IoLocationSharp /> Canada
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
