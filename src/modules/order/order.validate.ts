import { z } from "zod";

// Custom validation function for the entire object
const validateOrder = (value: Record<string, any>) => {
  const requiredFields = ["email", "productId", "price", "quantity"];
  const missingFields = requiredFields.filter((field) => !(field in value));
  if (missingFields.length > 0) {
    throw new Error(`${missingFields.join(", ")} are required`);
  }
  return value;
};

const OrderValidate = z
  .object({
    email: z.string().email(),
    productId: z.string(),
    price: z.number(),
    quantity: z.number(),
  })
  .transform(validateOrder);

export default OrderValidate;
