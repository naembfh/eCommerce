import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import validateProduct from "./product.validate";

const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Missing product data in request body",
      });
    }

    const { error } = validateProduct.safeParse(req.body);

    if (!error) {
      // Product data is valid
      const result = await ProductServices.createProduct(req.body);
      res.json({
        success: true,
        message: "Product created successfully!",
        data: result,
      });
    } else {
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
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const allProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.allProducts(searchTerm);
    const message = searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : "Products fetched successfully!";
    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch Products!",
      error: err,
    });
  }
};

const productById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.productById(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch product!",
      error: err.message,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateProduct(productId, updateData);
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not update product!",
      error: err.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProduct(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not delete product!",
      error: err.message,
    });
  }
};

export const ProductController = {
  createProduct,
  allProducts,
  productById,
  updateProduct,
  deleteProduct,
};
