import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/expandSlice";
import { MdArrowForwardIos, MdSpaceDashboard } from "react-icons/md";
import { useSession } from "next-auth/react";
import Link from "next/link";

import styles from "./styles.module.scss";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;

  const expandHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`${styles.sidebar} ${expand ? styles.opened : ""}`}>
      <div className={styles.sidebar__toggle} onClick={() => expandHandler()}>
        <div
          style={{
            transform: `${expand ? "rotate(180deg)" : ""}`,
            transition: "all 0.2s",
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.sidebar__user}>
          <img src={session?.user?.image} alt={session?.user?.name} />
          <div className={styles.show}>
            <span>Welcome Back 👏 </span>
            <span>{session?.user?.name}</span>
          </div>
        </div>
        <ul>
          <li>
            <Link href="">
              <MdSpaceDashboard />
              <span className={styles.show}>Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
