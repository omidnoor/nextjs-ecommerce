import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { IoIosArrowForward } from "react-icons/io";
import { useReducer } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Order from "@/models/Order";

import styles from "@/styles/order.module.scss";
import db from "@/utils/db";
import User from "@/models/User";

function reducer(state, action) {
  switch (action.type) {
    case "PAY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PAY_DELETE":
      return {
        ...state,
        orderData: action.orderData,
      };
    case "PAY_RESET":
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
      };
    case "PAY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "PAY_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default function OrderPage({ orderData, paypal_client_id }) {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [{ loading, success, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    success: false,
    order: {},
    error: null,
  });

  useEffect(() => {
    if (!orderData._id || success) {
      if (success) {
        dispatch({
          type: "PAY_RESET",
          payload: orderData,
        });
      }
    } else {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal_client_id,
          currency: "CAD",
          intent: "capture",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    }
  }, [order, success]);

  const createOrderHandler = () => {};

  const onApproveHandler = () => {};

  const onErrorHandler = () => {};

  return (
    <div>
      <Header country="Canada" />
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__info}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{" "}
                {orderData._id}
              </div>
              <div className={styles.order__header_status}>
                Payment Status :{" "}
                {orderData.isPaid ? (
                  <img src="/images/verified.png" alt="verified" />
                ) : (
                  <img src="/images/unverified.png" alt="unverified" />
                )}
              </div>
              <div className={styles.order__header_status}>
                Order Status :{" "}
                <span
                  className={
                    orderData.status === "Not Processed"
                      ? styles.not_processed
                      : orderData.status === "Processing"
                      ? styles.processing
                      : orderData.status === "Dispatched"
                      ? styles.dispatched
                      : orderData.status === "Cancelled"
                      ? styles.cancelled
                      : orderData.status === "Completed"
                      ? styles.completed
                      : ""
                  }
                >
                  {orderData.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {orderData.products.map((product, index) => (
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
              <div className={styles.order__products__total}>
                {orderData.couponApplied ? (
                  <>
                    <div className={styles.order__products__total_sub}>
                      <span>Subtotal</span>
                      <span>CAD {orderData.totalBeforeDiscount}$</span>
                    </div>
                    <div className={styles.order__products__total_sub}>
                      <span>
                        Coupon Applied <em>({orderData.couponApplied})</em>
                      </span>
                      <span>
                        -
                        {(
                          orderData.totalBeforeDiscount - orderData.total
                        ).toFixed(2)}
                        $
                      </span>
                    </div>
                    <div className={styles.order__products__total_sub}>
                      <span>Tax Price</span>
                      <span>CAD {orderData.taxPrice}$</span>
                    </div>
                    <div className={styles.order__products__total_sub}>
                      <span>TOTAL TO PAY</span>
                      <b>CAD {orderData.total.toFixed(2)}$</b>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.order__products__total_sub}>
                      <span>Tax Price</span>
                      <span>CAD {orderData.taxPrice}$</span>
                    </div>
                    <div className={styles.order__products__total_sub}>
                      <span>TOTAL TO PAY</span>
                      <bdo>CAD {orderData.total.toFixed(2)}$</bdo>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h2>Customer's Order</h2>
              <div className={styles.order__address__user}>
                <div className={styles.order__address__user_info}>
                  <img src={orderData.user.image} alt={orderData.user.name} />
                  <div className={styles.order__address__user_info_inner}>
                    <span>{orderData.user.name}</span>
                    <span>{orderData.user.email}</span>
                  </div>
                </div>
              </div>

              <div className={styles.order__address__shipping}>
                <h3>Shipping Address</h3>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <br />
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},{" "}
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div>

              <div className={styles.order__address__billing}>
                <h3>Billing Address</h3>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <br />
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},{" "}
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div>
            </div>
            <div className={styles.order__payment}>
              {isPending ? (
                <span>loading...</span>
              ) : (
                <PayPalButtons
                  createOrder={createOrderHandler}
                  onApprove={onApproveHandler}
                  onError={onErrorHandler}
                ></PayPalButtons>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await db.connectDb();
    const { query } = context;
    const id = query.id;
    const order = await Order.findById(id)
      .populate({ path: "user", model: User })
      .lean();

    const paypal_client_id = process.env.PAYPAL_CLIENT_ID;
    const paypal_client_secret = process.env.PAYPAL_CLIENT_SECRET;
    return {
      props: {
        orderData: JSON.parse(JSON.stringify(order)),
        paypal_client_id,
      },
    };
  } catch (error) {
    console.error("Error fetching order data:", error);
    return { notFound: true };
  } finally {
    await db.disconnectDb();
  }
}
