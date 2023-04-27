import Category from "@/models/Category";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Product from "@/models/product";

import styles from "@/styles/products.module.scss";

const initialState = {
  name: "",
  description: "",
  brand: "",
  // sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};

export default function CreateProduct({ parents, categories }) {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  console.log(product.parent);
  useEffect(() => {
    const getParent = async () => {
      if (!product.parent) return;
      const { data } = await axios.get(`/api/product/${product.parent}`);
      if (data) {
        setProduct({
          ...product,
          name: data.name,
          description: data.description,
          brand: data.brand,
          // sku: data.sku,
          category: data.category,
          subCategories: data.subCategories,
          questions: [],
          details: [],
        });
      }
      console.log("getParent runs");
    };
    getParent();
  }, [product.parent]);

  useEffect(() => {
    const getSubs = async () => {
      const { data } = await axios.get(`/api/admin/subcategory`, {
        params: {
          category: product.category,
        },
      });
      // console.log(data);
      setSubs(data);
    };
    getSubs();
  }, [product.category]);

  return (
    <Layout>
      <div className={styles.header}>Create Products</div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const results = await Product.find({}).select("name subProducts").lean();
  const categories = await Category.find({}).lean();
  await db.disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
