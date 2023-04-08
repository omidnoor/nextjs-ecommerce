import { useSession } from "next-auth/react";

import styles from "./styles.module.scss";

export default function User() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className={styles.user}>
      <img src="../../../images/userheader.jpg" alt="" />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session.user.image} alt={session.user.name} />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
