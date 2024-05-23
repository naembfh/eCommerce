import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;

    // Check if any data is missing and quantiy validate
    const missingFields: string[] = [];
    if (!email) missingFields.push("email");
    if (!productId) missingFields.push("productId");
    if (!price) missingFields.push("price");
    if (!quantity) missingFields.push("quantity");

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      });
    }

    // Create the order
    const order = await OrderServices.createOrder(
      email,
      productId,
      price,
      quantity
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message === "Product not found") {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      } else if (
        error.message === "Insufficient quantity available in inventory"
      ) {
        return res.status(400).json({
          success: false,
          message: "Insufficient quantity available in inventory",
        });
      }
    }

    // Handle other unexpected errors

    return res.status(500).json({
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
      : "Orders fetched successfully!";

    if (result.length === 0) {
      throw new Error("Order not found");
    }

    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err: unknown) {
    if ((err as Error).message === "Order not found") {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Could not fetch Orders!",
      error: (err as Error).message,
    });
  }
};

export const OrderController = {
  createOrder,
  allOrders,
};
