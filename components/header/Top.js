import Link from "next/link";
import { useState } from "react";

import { MdOutlineSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";

import styles from "./styles.module.scss";
import UserMenu from "./UserMenu";

export default function Top() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li>
            <img src="../images/canada-flag.png" alt="flag" />
            <span>Canada / CAD</span>
          </li>

          <li>
            <MdOutlineSecurity />
            <span>Buyer Protection</span>
          </li>

          <li>
            <span>Customer Service</span>
          </li>

          <li>
            <span>Help</span>
          </li>

          <li>
            <BsSuitHeart />
            <Link href="/profile/whishlist">Whishlist</Link>
          </li>

          <li>
            {loggedIn ? (
              <li>
                <div className={styles.flex}>
                  <img src="../../images/Omid-Noorshams.jpg" alt="user" />
                  <span>Omid</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}

            <UserMenu loggedIn={loggedIn} />
          </li>
        </ul>
      </div>
    </div>
  );
}
