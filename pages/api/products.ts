// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apiPath } from "./const";
import { Filters, Products } from "../../types/products";

type Data = {
  products: Products;
  filters: Filters;
};

const getFilters = (products: Products): Filters => {
  const filter: Filters = {
    type: { input: "checkbox", values: [], name: "Type" },
    price: { input: "slide", min: Infinity, max: -Infinity, name: "Price" },
    color: { input: "colorbox", values: [], name: "Color" },
    gender: { input: "checkbox", values: [], name: "Gender" }
  };

  products.forEach((product) => {
    for (const key in product) {
      switch (key) {
        case "type":
        case "gender":
        case "color":
          if (filter[key].values) {
            filter[key].values = [
              ...new Set([...filter[key].values, product[key]])
            ];
          }
          break;
        case "price":
          if (
            filter.price.min !== undefined &&
            filter.price.min > product[key]
          ) {
            filter.price.min = product[key];
          }
          if (
            filter.price.max !== undefined &&
            filter.price.max < product[key]
          ) {
            filter.price.max = product[key];
          }
          break;
      }
    }
  });

  return filter;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const productResponse = await fetch(apiPath);
  const products = await productResponse.json();
  res.status(200).json({ products, filters: getFilters(products) });
}
