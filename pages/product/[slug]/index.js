import db from "@/utils/db";

import Category from "@/models/category";
import SubCategory from "@/models/subCategory";
import Product from "@/models/product";
import ProductSingle from "@/components/product";

import styles from "@/styles/product.module.scss";

export default function ProductPage({ product, country }) {
  return (
    <>
      <ProductSingle product={product} country={country} />
    </>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const { query } = context;

  const slug = query.slug;
  const style = query.style ?? null;
  const size = query.size || 0;

  const product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories._id", model: SubCategory })
    .lean();

  if (!product) {
    await db.disconnectDb();
    return {
      notFound: true,
    };
  }

  const subProduct = product?.subProducts[style];

  const prices = subProduct?.sizes
    .map((size) => size.price)
    .sort((a, b) => a - b);

  const newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    // sku: subProduct.sku,
    color: product.subProducts.map((product) => product.color),
    priceRange:
      prices.length > 1
        ? `From ${prices[0]} to ${prices[prices.length - 1]}`
        : "",
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price *
            (1 - subProduct.discount / 100)
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
  };

  await db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: { name: "Canada", flag: "/images/canada-flag.png" },
    },
  };
}
