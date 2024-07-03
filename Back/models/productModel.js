import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    name: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    brand: String,
    images: [String],
    brandImg: String,
    price: Number,
    quantity: Number
})


const Product = mongoose.model('Product', productSchema);
export default Product;