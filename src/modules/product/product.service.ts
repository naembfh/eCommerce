import { Product } from "./product.model";

const createProduct = async (payload: unknown) => {
  const result = await Product.create(payload);
  return result;
};

const allProducts = async (searchTerm?: string) => {
  let query = {};

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        // { tags: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }

  const result = await Product.find(query);
  return result;
};

const productById = async (productId: string) => {
  const fountProduct = await Product.findById(productId);
  if (!fountProduct) throw new Error("Product not found");
  return fountProduct;
};

const updateProduct = async (
  productId: string,
  updateData: Record<string, any>
) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
  });

  if (!product) throw new Error("Product not found");

  //   update product intance for stock
  Object.assign(product, updateData);
  await product.save();

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
