"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Custom validation function for the entire object
const validateOrder = (value) => {
    const requiredFields = ["email", "productId", "price", "quantity"];
    const missingFields = requiredFields.filter((field) => !(field in value));
    if (missingFields.length > 0) {
        throw new Error(`${missingFields.join(", ")} are required`);
    }
    return value;
};
const OrderValidate = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
})
    .transform(validateOrder);
exports.default = OrderValidate;
