import { useState } from "react";

import Layout from "@/components/admin/layout";
import Category from "@/models/Category";
import db from "@/utils/db";
import Create from "@/components/admin/categories/Create";
import List from "@/components/admin/categories/List";

export default function Categories({ categories }) {
  const [data, setData] = useState(categories);

  return (
    <div>
      <Layout>
        <div>
          <Create setCategories={setData} />
          <List categories={data} setCategories={setData} />
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  await db.disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
