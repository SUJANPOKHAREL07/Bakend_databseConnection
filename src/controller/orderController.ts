import { NextFunction, Request, Response } from "express";
import { sqlOrderModal } from "../sql-models/orderSQLmodals";
import { sqlProductModal } from "../sql-models/productSQLmodal";
import { sqlUserModal } from "../sql-models/userSQLmodal";

function validateOrderInput(body: any) {
  if (typeof body.userId !== "number") {
    return "userId must be a number";
  }
  if (!Array.isArray(body.productIds) || body.productIds.length === 0) {
    return "productIds must be a non-empty array";
  }
  // Check if user exists
  if (!sqlUserModal.getUserBYId(body.userId)) {
    return "User does not exist";
  }
  // Check if all products exist
  for (const pid of body.productIds) {
    if (!sqlProductModal.getById(pid)) {
      return `Product with id ${pid} does not exist`;
    }
  }
  return null;
}

export const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validateOrderInput(req.body);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const order = sqlOrderModal.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};


