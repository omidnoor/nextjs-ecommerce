import { useState } from "react";

import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Create from "@/components/admin/coupons/Create";
import List from "@/components/admin/coupons/List";
import Coupon from "@/models/Coupon";

export default function Coupons({ coupons }) {
  const [data, setData] = useState(coupons);

  return (
    <div>
      <Layout>
        <div>
          <Create setCoupons={setData} />
          <List coupons={data} setCoupons={setData} />
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
  await db.disconnectDb();
  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}
