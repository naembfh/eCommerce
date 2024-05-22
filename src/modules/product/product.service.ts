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

const updateProduct = async (productId: string, updateData: any) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
  });
  if (!product) throw new Error("Product not found");
  return product;
};

const deleteProduct = async (productId: string) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) throw new Error("Product not found");
  return null;
};

export const ProductServices = {
  createProduct,
  allProducts,
  productById,
  updateProduct,
  deleteProduct,
};
