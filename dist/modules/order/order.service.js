"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrder = (email, productId, price, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check the product exists
        const product = yield product_model_1.Product.findById(productId);
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
        yield product.save();
        // Create the order
        const order = new order_model_1.Order({ email, productId, price, quantity });
        yield order.save();
        return order;
    }
    catch (error) {
        throw error;
    }
});
const allOrders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (email) {
        query = { email };
    }
    console.log(query);
    const result = yield order_model_1.Order.find(query);
    return result;
});
exports.OrderServices = {
    createOrder,
    allOrders,
};
