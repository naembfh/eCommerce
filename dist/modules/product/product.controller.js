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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validate_1 = __importDefault(require("./product.validate"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Missing product data in request body",
            });
        }
        const { error } = product_validate_1.default.safeParse(req.body);
        if (!error) {
            // Product data is valid
            const result = yield product_service_1.ProductServices.createProduct(req.body);
            res.json({
                success: true,
                message: "Product created successfully!",
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
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.allProducts();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch Products fetched!",
            error: err,
        });
    }
});
const productById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.productById(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch product!",
            error: err.message,
        });
    }
});
exports.ProductController = {
    createProduct,
    allProducts,
    productById,
};
