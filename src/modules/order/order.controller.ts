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
      // order data is valid
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

const allOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderServices.allOrders(email);
    const message = email
      ? `Orders fetched successfully for user email!`
      : "Order not found";
    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch Orders!",
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  allOrders,
};
