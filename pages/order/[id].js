import Footer from "@/components/footer";
import Header from "@/components/header";
import Order from "@/models/Order";

import styles from "@/styles/order.module.scss";
import db from "@/utils/db";

export default function OrderPage({ order }) {
  return (
    <div>
      <Header country="Canada" />

      {/* <Footer country="Canada" /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await db.connectDb();
    const { query } = context;
    const id = query.id;
    const order = await Order.findById(id).populate("user").lean();
    console.log(order);
    return {
      props: {
        order: JSON.parse(JSON.stringify(order)),
      },
    };
  } catch (error) {
    console.error("Error fetching order data:", error);
    return { notFound: true };
  } finally {
    await db.disconnectDb();
  }
}
