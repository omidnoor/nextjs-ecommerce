import Category from "@/models/Category";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";

import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Product from "@/models/product";
import { Form, Formik } from "formik";
import SingularSelect from "@/components/selects/SingularSelect";

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
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [descriptionImages, setDescriptionImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const validate = Yup.object();

  const createProduct = async () => {};

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  console.log(product);
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
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color.color,
          imageInputFile: "",
          styleInout: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => {
          return (
            <Form>
              {/* <Images
              name="imageInputFile"
              header="Product Images"
              text="Add Images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            /> */}
              <div className={styles.flex}>
                {/* {product.color.image && (
                  <img
                    src={product.color.image}
                    alt="product color"
                    className={styles.image_span}
                  />
                )}

                {product.color.color && (
                  <span
                    style={{ background: `${product.color.color}` }}
                    className={styles.color_span}
                  >
                    {product.color.color}
                  </span>
                )} */}

                {/* <Colors
                name="color"
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
              />

              <Style 
              name="styleInput"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
              /> */}
              </div>
              <SingularSelect
                name="parent"
                value={product.parent}
                placeholder="Parent product"
                data={parents}
                header="Add to an existing product"
                onChangeHandler={onChangeHandler}
              />
            </Form>
          );
        }}
      </Formik>
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
