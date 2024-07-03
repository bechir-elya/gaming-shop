import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import { unlink } from 'node:fs/promises';

export const getProduct = async (req, res) => {
    const productData = await Product.find().populate('category');
    const categoryData = await Category.find();
    res.json({ products: productData, categories: categoryData });
}

export const addProduct = async (req, res) => {

    try {
        const { name, category, brand, price, quantity } = req.body;

        const images = req.files['images'] ? req.files['images'].map(file => file.filename) : [];
        const brandImg = req.files['brandImg'] ? req.files['brandImg'][0].filename : '';

        await Product.create({
            name,
            category,
            brand,
            images,
            brandImg,
            price,
            quantity
        });

        res.json('Product added successfully.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const addCategory = async (req, res) => {
    await Category.create({
        title: req.body.title
    });

    res.json('Category added successfully.');
}


export const updateProduct = async (req, res) => {

    const id = req.params.id;

    try {
        const { name, category, brand, price, quantity } = req.body;
        const images = req.files['images'] ? req.files['images'].map(file => file.filename) : [];
        const brandImg = req.files['brandImg'] ? req.files['brandImg'][0].filename : '';

        const updateData = {
            name,
            category,
            brand,
            price,
            quantity
        };

        if (images.length > 0) {
            updateData.images = images;
        }

        if (brandImg) {
            updateData.brandImg = brandImg;
        }

        await Product.findByIdAndUpdate(id, updateData);

        res.json('Product updated successfully.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const images = product.images || [];
        const brandImg = product.brandImg;

        await Product.findByIdAndDelete(id);

        const unlinkPromises = images.map(image => unlink(`public/uploads/${image}`));
        if (brandImg) {
            unlinkPromises.push(unlink(`public/uploads/${brandImg}`));
        }

        await Promise.all(unlinkPromises);

        res.status(200).json({ success: true, msg: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
