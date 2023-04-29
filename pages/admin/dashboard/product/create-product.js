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
import MultipleSelect from "@/components/selects/MultipleSelect";
import AdminInput from "@/components/inputs/adminInput";
import DialogModal from "@/components/dialogModal";
import Images from "@/components/admin/createProduct/images";
import Colors from "@/components/admin/createProduct/colors";

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

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    /*
    subCategories: Yup.array().min(
      1,
      "Please select atleast one sub Category."
    ),
   */
    // sku: Yup.string().required("Please add a sku/number"),
    color: Yup.string().required("Please add a color"),
    description: Yup.string().required("Please add a description"),
  });

  const createProduct = async () => {};

  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setProduct({ ...product, [name]: value });
  };
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
    };
    getParent();
  }, [product.parent]);

  useEffect(() => {
    const getSubs = async () => {
      const { data } = await axios.get("/api/admin/subcategory", {
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
      <DialogModal />
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
              <Images
                name="imageInputFile"
                header="Product Images"
                text="Add Images"
                images={images}
                setImages={setImages}
                setColorImage={setColorImage}
              />
              <div className={styles.flex}>
                {product.color.image && (
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
                )}
              </div>

              <Colors
                name="color"
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
              />

              {/* <Style 
              name="styleInput"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
              /> */}
              <SingularSelect
                name="parent"
                value={product.parent}
                placeholder="Parent Product"
                data={parents}
                header="Add to an existing product"
                onChangeHandler={onChangeHandler}
              />

              <SingularSelect
                name="category"
                value={product.category}
                placeholder="Category"
                data={categories}
                header="Select a category"
                onChangeHandler={onChangeHandler}
                disabled={!!product.parent}
              />

              {product.category && (
                <MultipleSelect
                  value={product.subCategories}
                  data={subs}
                  header="Select Sub Categories"
                  name="subCategories"
                  onChangeHandler={onChangeHandler}
                  disabled={!!product.parent}
                />
              )}

              <div className={styles.header}>Basic Info</div>
              <AdminInput
                type="text"
                label="Name"
                name="name"
                placeholder="Product Name"
                onChange={onChangeHandler}
              />
              <AdminInput
                type="text"
                label="Description"
                name="description"
                placeholder="Product Description"
                onChange={onChangeHandler}
              />
              <AdminInput
                type="text"
                label="Brand"
                name="brand"
                placeholder="Product Brand"
                onChange={onChangeHandler}
              />
              {/* <AdminInput
                type="text"
                label="Sku"
                name="sku"
                placeholder="Product Sku/Number"
                onChange={onChangeHandler}
              /> */}
              <AdminInput
                type="text"
                label="Discount"
                name="discount"
                placeholder="Product Discount"
                onChange={onChangeHandler}
              />
              {/* <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add Images"
              images={descriptionImages}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            /> */}
              {/* <Sizes
              sizes={product.sizes}
              product={product}
              setProduct={setProduct}
            
            /> */}
              {/* <Details
              details={product.details}
              product={product}
              setProduct={setProduct}
            
            /> */}
              {/* <Questions
              questions={product.questions}
              product={product}
              setProduct={setProduct}
            
            /> */}

              <button className={styles.btn} type="submit">
                Create Product
              </button>
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
