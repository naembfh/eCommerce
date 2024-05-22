import express, { Request, Response } from "express";

import { OrderRoutes } from "./modules/order/order.route";
import { ProductRoutes } from "./modules/product/product.route";

const app = express();
app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
