import { z } from "zod";

const OrderValidate = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default OrderValidate;
