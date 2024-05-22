import { Order } from "./order.model";

const createOrder = async (payload: any) => {
  const result = Order.create(payload);
  return result;
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
