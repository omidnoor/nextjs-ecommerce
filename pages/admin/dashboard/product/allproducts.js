import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Product from "@/models/product";
import Category from "@/models/Category";
import ProductCard from "@/components/admin/products/productCard";

import styles from "@/styles/products.module.scss";

export default function allProducts({ products }) {
  // console.log(products);
  return (
    <Layout>
      <div className={styles.header}>All Products</div>
      {products.map((product, index) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    await db.connectDb();
    const products = await Product.find({})
      .populate({ path: "category", model: Category })
      .sort({ createdAt: -1 })
      .lean();

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.error(error.message);
  } finally {
    await db.disconnectDb();
  }
}
