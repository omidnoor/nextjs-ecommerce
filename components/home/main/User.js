import { useSession } from "next-auth/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Navigation } from "swiper";

import styles from "./styles.module.scss";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { userSwiperArray } from "@/data/home";

export default function User() {
  const { data: session } = useSession();

  return (
    <div className={styles.user}>
      <img
        src="../../../images/userheader.jpg"
        alt="user section header image"
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session.user?.image} alt={session.user?.name} />
            <h4>{session.user?.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <img src="/images/default/default-user.jpg" alt="default image" />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}

        <ul className={styles.user__links}>
          <li>
            <Link href="/profile">
              <IoSettingsOutline />
            </Link>
          </li>

          <li>
            <Link href="">
              <HiOutlineClipboardList />
            </Link>
          </li>

          <li>
            <Link href="">
              <AiOutlineMessage />
            </Link>
          </li>

          <li>
            <Link href="">
              <BsHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <>
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards, Navigation]}
              navigation={true}
              className="userMenu__swiper"
              style={{ maxWidth: "180px", height: "240px", marginTop: "1rem" }}
            >
              {userSwiperArray.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link href={item.link}>
                    <img src={item.image} alt="swiper images" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        </div>
      </div>
      <img
        src="../../../images/userheader.jpg"
        alt="user section header image"
        className={styles.user__footer}
      />
    </div>
  );
}
