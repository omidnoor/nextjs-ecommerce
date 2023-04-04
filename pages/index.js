import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/styles/Home.module.scss";

export default function Home({ country }) {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="">
      <Header country={country} />
      {session ? <p>loggedin</p> : <p>not logged in</p>}
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
      country: { name: "Canada", flag: "../images/canada-flag.png" },
    },
  };
}
