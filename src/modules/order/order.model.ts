import { Schema, model } from "mongoose";
import { Order as orderInterface } from "./order.interface";

const orderSchema = new Schema<orderInterface>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Order = model<orderInterface>("Order", orderSchema);
