"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const maxLength1 = 255;
const maxLength2 = 25;
const validateProduct = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: "Name is required" })
        .max(maxLength2, {
        message: `Name cannot exceed ${maxLength2} characters`,
    }),
    description: zod_1.z
        .string()
        .min(1, { message: "Description is required" })
        .max(maxLength1, {
        message: `Description cannot exceed ${maxLength1} characters`,
    }),
    price: zod_1.z.number().min(0, { message: "Price must be non-negative" }),
    category: zod_1.z
        .string()
        .min(1, { message: "Category is required" })
        .max(maxLength2, {
        message: `Category cannot exceed ${maxLength2} characters`,
    }),
    tags: zod_1.z
        .array(zod_1.z.string())
        .min(1, { message: "At least one tag is required" })
        .max(maxLength1, {
        message: `Tags cannot exceed ${maxLength1} characters total`,
    }),
    variants: zod_1.z
        .array(zod_1.z.object({
        type: zod_1.z
            .string()
            .min(1, { message: "Variant type is required" })
            .max(maxLength2, {
            message: `Variant type cannot exceed ${maxLength2} characters`,
        }),
        value: zod_1.z
            .string()
            .min(1, { message: "Variant value is required" })
            .max(maxLength2, {
            message: `Variant value cannot exceed ${maxLength2} characters`,
        }),
    }))
        .min(1, { message: "At least one variant is required" }),
    inventory: zod_1.z.object({
        quantity: zod_1.z
            .number()
            .min(0, { message: "Inventory quantity must be non-negative" }),
        inStock: zod_1.z.boolean().optional(),
    }),
});
exports.default = validateProduct;
