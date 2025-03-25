import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

// create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const categoryExists = await categoryModel.findOne({
      name,
    });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = new categoryModel({ name });
    await category.save();
    res.status(201).json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a category
export const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    await category.save();
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await categoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, countInStock, category } = req.body;
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    if (
      !name ||
      !description ||
      !image ||
      !price ||
      !countInStock ||
      !category
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const product = new productModel({
      name,
      description,
      image,
      price,
      countInStock,
      category,
    });
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    const productsInfo = products.map((product) => ({
      ...product,
      image: `data:${
        product.image.contentType
      };base64,${product.image.data.toString("base64")}`,
    }));
    res.status(200).json({ products: productsInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, countInStock, category } = req.body;
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    if (
      !name ||
      !description ||
      !image ||
      !price ||
      !countInStock ||
      !category
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = name;
    product.description = description;
    product.image = image;
    product.price = price;
    product.countInStock = countInStock;
    product.category = category;
    await product.save();
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
