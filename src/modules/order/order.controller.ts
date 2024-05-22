import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidate from "./order.validate";

const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Missing order data in request body",
      });
    }

    const { error } = OrderValidate.safeParse(req.body);

    if (!error) {
      // Product data is valid
      const result = await OrderServices.createOrder(req.body);
      res.json({
        success: true,
        message: "Order created successfully!",
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

export const OrderController = {
  createOrder,
};
