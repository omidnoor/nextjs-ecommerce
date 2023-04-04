import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import { MdOutlineSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";

import styles from "./styles.module.scss";
import UserMenu from "./UserMenu";

export default function Top({ country }) {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country.flag} alt={country.name} />
            <span>Canada / CAD</span>
          </li>

          <li className={styles.li}>
            <MdOutlineSecurity />
            <span>Buyer Protection</span>
          </li>

          <li className={styles.li}>
            <span>Customer Service</span>
          </li>

          <li className={styles.li}>
            <span>Help</span>
          </li>

          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">Whishlist</Link>
          </li>

          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img src={session.user.image} alt={session.user.name} />
                  <span>{session.user.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}

            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
