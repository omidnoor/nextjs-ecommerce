import { IoIosArrowForward } from "react-icons/io";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Order from "@/models/Order";

import styles from "@/styles/order.module.scss";
import db from "@/utils/db";

export default function OrderPage({ order }) {
  return (
    <div>
      <Header country="Canada" />
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__info}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{" "}
                {order._id}
              </div>
              <div className={styles.order__header_status}>
                Payment Status :{" "}
                {order.isPaid ? (
                  <img src="/images/verified.png" alt="verified" />
                ) : (
                  <img src="/images/unverified.png" alt="unverified" />
                )}
              </div>
              <div className={styles.order__header_status}>
                Order Status :{" "}
                <span
                  className={
                    order.status === "Not Processed"
                      ? styles.not_processed
                      : order.status === "Processing"
                      ? styles.processing
                      : order.status === "Dispatched"
                      ? styles.dispatched
                      : order.status === "Cancelled"
                      ? styles.cancelled
                      : order.status === "Completed"
                      ? styles.completed
                      : ""
                  }
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {order.products.map((product, index) => (
                <div key={index} className={styles.product}>
                  <div className={styles.product__img}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.product__info}>
                    <h1 className={styles.product__info_name}>
                      {product.name.length > 30
                        ? `${product.name.slice(0, 30)}...`
                        : product.name}
                    </h1>
                    <div className={styles.product__info_style}>
                      <img src={product.color.image} alt="product style" /> /{" "}
                      {product.size}
                    </div>
                    <div className={styles.product__info_price_qty}>
                      CAD {product.price}$ x {product.qty}
                    </div>
                    <div className={styles.product__info_total_price}>
                      CAD {product.price * product.qty}$
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.order__actions}></div>
        </div>
      </div>

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
