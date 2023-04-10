import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/styles/Home.module.scss";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flash-deals";
import Category from "@/components/home/category";
import { women_dresses } from "@/data/home";

export default function Home({ country }) {
  const { data: session } = useSession();

  return (
    <div className="">
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <Category />
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
