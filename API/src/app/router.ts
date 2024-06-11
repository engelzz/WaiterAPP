import path from 'node:path';

import e, { Router } from "express";
import multer from "multer";

import { listCategories } from "./useCases/categories/listCategories";
import { createCategory } from "./useCases/categories/createCategory";
import { listProducts } from "./useCases/products/listProducts";
import { createProduct } from "./useCases/products/createProduct";
import { listProductsByCategories } from "./useCases/categories/listProductsByCategories";
import { listOrders } from "./useCases/orders/listOrders";
import { createOrder } from "./useCases/orders/createOrder";
import {deleteOrder} from "./useCases/orders/deleteOrder";
import {changeOrderStatus} from "./useCases/orders/changeOrderStatus";

export const router = Router();

const upload = multer({
  storage : multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req , file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List Categories
router.get('/categories', listCategories);

// Create Category
router.post('/categories', createCategory);

// List Products
router.get('/products', listProducts);

// Create Product
router.post('/products', upload.single('image'), createProduct);

// Get Product by category
router.get('/categories/:categoryId/products', listProductsByCategories);

// List Orders
router.get('/orders', listOrders);

// Create Order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderID', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderID', deleteOrder);