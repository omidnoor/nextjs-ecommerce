import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/styles/Home.module.scss";
import Main from "@/components/home/main";

export default function Home({ country }) {
  const { data: session } = useSession();

  return (
    <div className="">
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await axios
    .get("https://api.ipregistry.co/?key=m49ix9thr1k7pcns")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => console.log(err));

  return {
    props: {
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: { name: "Canada", flag: "/images/canada-flag.png" },
    },
  };
}
