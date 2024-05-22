import { Order } from "./order.model";

const createOrder = async (payload: any) => {
  const result = Order.create(payload);
  return result;
};

export const OrderServices = {
  createOrder,
};
