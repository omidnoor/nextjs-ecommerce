import db from "@/utils/db";
import User from "@/models/User";
import Category from "@/models/Category";
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
    .populate({ path: "reviews.reviewBy", model: User })
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
        ? `From ${Math.ceil(
            prices[0] - (prices[0] * subProduct.discount) / 100,
          )}$ to ${Math.ceil(
            prices[prices.length - 1] -
              (prices[prices.length - 1] * subProduct.discount) / 100,
          )}$`
        : `${Math.ceil(prices[0])}$`,
    price:
      subProduct.discount > 0
        ? (subProduct.sizes[size].price * (1 - subProduct.discount / 100))
            .toFixed(2)
            .concat("$")
        : subProduct.sizes[size].price.toFixed(2).concat("$"),
    priceBefore: `${subProduct.sizes[size].price}$`,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: 76,
      },
      {
        percentage: 14,
      },
      {
        percentage: 6,
      },
      {
        percentage: 4,
      },
      {
        percentage: 0,
      },
    ],
    allSizes: product.subProducts
      .map((product) => product.sizes)
      .flat()
      .sort((a, b) => a.size - b.size)
      .filter(
        (el, i, arr) => arr.findIndex((el2) => el2.size === el.size) === i,
      ),
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
