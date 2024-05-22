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
    const result = await ProductServices.allProducts();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch Products fetched!",
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

export const ProductController = {
  createProduct,
  allProducts,
  productById,
};
