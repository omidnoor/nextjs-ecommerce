import { useState } from "react";

import Layout from "@/components/admin/layout";
import Category from "@/models/Category";
import db from "@/utils/db";
import Create from "@/components/admin/subcategories/Create";
import List from "@/components/admin/subcategories/List";
import SubCategory from "@/models/subCategory";

import styles from "@/styles/dashboard.module.scss";

export default function SubCategories({ categories, subcategories }) {
  const [data, setData] = useState(subcategories);

  console.log(data);

  return (
    <div>
      <Layout>
        <div>
          <Create setSubcategories={setData} categories={categories} />
          <List subcategories={data} setsubCategories={setData} />
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  const subcategories = await SubCategory.find({})
    .sort({ updatedAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subcategories: JSON.parse(JSON.stringify(subcategories)),
    },
  };
}
