import { Product } from "../product/product.model";
import { Order } from "./order.model";

const createOrder = async (
  email: string,
  productId: string,
  price: number,
  quantity: number
) => {
  try {
    // Check the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check available quantity
    if (quantity > product.inventory.quantity) {
      throw new Error("Insufficient quantity available in inventory");
    }

    // Decrease and update the quantity in inventory
    product.inventory.quantity -= quantity;

    product.inventory.inStock = product.inventory.quantity > 0;
    if (product.inventory.quantity <= 0) {
      product.inventory.inStock = false;
    }

    // Save the product
    await product.save();

    // Create the order
    const order = new Order({ email, productId, price, quantity });
    await order.save();

    return order;
  } catch (error) {
    throw error;
  }
};

const allOrders = async (email?: string) => {
  let query = {};

  if (email) {
    query = { email };
  }
  console.log(query);

  const result = await Order.find(query);

  return result;
};

export const OrderServices = {
  createOrder,
  allOrders,
};
