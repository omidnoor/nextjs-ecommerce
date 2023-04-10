import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

import db from "@/utils/db";
import Product from "@/models/product";
import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/styles/Home.module.scss";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flash-deals";
import Category from "@/components/home/category";

export default function Home({ country, products }) {
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
  db.connectDb();

  let products = await Product.find().sort({ createAt: -1 }).lean();

  const data = await axios
    .get("https://api.ipregistry.co/?key=m49ix9thr1k7pcns")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => console.log(err));

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: { name: "Canada", flag: "/images/canada-flag.png" },
    },
  };
}
