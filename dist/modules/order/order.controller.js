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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validate_1 = __importDefault(require("./order.validate"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Missing order data in request body",
            });
        }
        const { error } = order_validate_1.default.safeParse(req.body);
        if (!error) {
            // order data is valid
            const result = yield order_service_1.OrderServices.createOrder(req.body);
            res.json({
                success: true,
                message: "Order created successfully!",
                data: result,
            });
        }
        else {
            const errorMessages = error.issues.map((err) => ({
                field: err.path[0],
                message: err.message,
            }));
            res.status(400).json({
                success: false,
                message: "Validation errors",
                errors: errorMessages,
            });
        }
    }
    catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
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
