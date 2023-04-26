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

  return (
    <div>
      <Layout>
        <div>
          <Create setSubcategories={setData} categories={categories} />
          <List
            categories={categories}
            subcategories={data}
            setSubcategories={setData}
          />
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  const subcategories = await SubCategory.find({})
    .populate({ path: "parent", model: "Category" })
    .sort({ updatedAt: -1 })
    .lean()
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
