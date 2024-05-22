import { Product } from "./product.model";

const createProduct = async (payload: any) => {
  const result = await Product.create(payload);
  return result;
};

const allProducts = async () => {
  const result = await Product.find();
  return result;
};

const productById = async (productId: string) => {
  const fountProduct = await Product.findById(productId);
  if (!fountProduct) throw new Error("Product not found");
  return fountProduct;
};

export const ProductServices = {
  createProduct,
  allProducts,
  productById,
};
