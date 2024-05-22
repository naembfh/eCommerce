import { z } from "zod";

const maxLength1 = 255;
const maxLength2 = 25;

const validateProduct = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(maxLength2, {
      message: `Name cannot exceed ${maxLength2} characters`,
    }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(maxLength1, {
      message: `Description cannot exceed ${maxLength1} characters`,
    }),
  price: z.number().min(0, { message: "Price must be non-negative" }),
  category: z
    .string()
    .min(1, { message: "Category is required" })
    .max(maxLength2, {
      message: `Category cannot exceed ${maxLength2} characters`,
    }),
  tags: z
    .array(z.string())
    .min(1, { message: "At least one tag is required" })
    .max(maxLength1, {
      message: `Tags cannot exceed ${maxLength1} characters total`,
    }),
  variants: z
    .array(
      z.object({
        type: z
          .string()
          .min(1, { message: "Variant type is required" })
          .max(maxLength2, {
            message: `Variant type cannot exceed ${maxLength2} characters`,
          }),
        value: z
          .string()
          .min(1, { message: "Variant value is required" })
          .max(maxLength2, {
            message: `Variant value cannot exceed ${maxLength2} characters`,
          }),
      })
    )
    .min(1, { message: "At least one variant is required" }),
  inventory: z.object({
    quantity: z
      .number()
      .min(0, { message: "Inventory quantity must be non-negative" }),
    inStock: z.boolean().optional(),
  }),
});

export default validateProduct;
