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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quantity } = req.body;
        const order = yield order_service_1.OrderServices.createOrder(email, productId, price, quantity);
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: order,
        });
    }
    catch (error) {
        // Handle errors
        if (error.message === "Product not found") {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        else if (error.message === "Insufficient quantity available in inventory") {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        else {
            // Handle other unexpected errors
            console.error("Unexpected error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
});
const allOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.OrderServices.allOrders(email);
        const message = email
            ? `Orders fetched successfully for user email!`
            : "Orders fetched successfully!";
        if (result.length === 0) {
            throw new Error("Order not found");
        }
        res.status(200).json({
            success: true,
            message: message,
            data: result,
        });
    }
    catch (err) {
        if (err.message === "Order not found") {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        // Handle other errors
        res.status(500).json({
            success: false,
            message: "Could not fetch Orders!",
            error: err.message,
        });
    }
});
exports.OrderController = {
    createOrder,
    allOrders,
};
