import multer from 'multer';
import express from 'express';
import { createCategory, createProduct, deleteCategory, deleteProduct, getAllProducts, getCategory, updateCategory, updateProduct } from '../controllers/adminController.js';
import { adminProtect } from '../middlewares/authMiddleware.js';

export const adminRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// create category
adminRouter.post('/create-category', adminProtect, createCategory);
// get a category
adminRouter.get('/category/:id', adminProtect, getCategory);
// update a category
adminRouter.put('/update-category/:id', adminProtect, updateCategory);
// delete a category
adminRouter.delete('/delete-category/:id', adminProtect, deleteCategory);
// create a new product
adminRouter.post('/create-product', adminProtect, upload.single('image'), createProduct)
// get all products
adminRouter.get('/products', adminProtect, getAllProducts);
// update a product
adminRouter.put('/update-product/:id', adminProtect, upload.single('image'), updateProduct);
// delete a product
adminRouter.delete('/delete-product/:id', adminProtect, deleteProduct);