import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    last_name: {type: String, required: true},
    birth: {type: Date, required: true},
    adress: {type: String, required: true},
    zip_code: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    country_code: {type: String, required: true},
    phone: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    resetToken: String,
})

const User = mongoose.model('User', userSchema);
export default User;