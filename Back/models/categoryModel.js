import mongoose from "mongoose";

export const categorySchema = mongoose.Schema({
    title: String
})

const Category = mongoose.model('Category', categorySchema);
export default Category;