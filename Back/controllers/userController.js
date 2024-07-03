import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();


export const register = async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username.length < 6) {
        res.status(400).json('Username must be at least 6 characters.');
    }

    const validEmail = validator.isEmail(email);
    const validPassword = validator.isStrongPassword(password);

    if (!validEmail) {
        res.status(400).json('Invalid email.');
    }

    if (!validPassword) {
        res.status(400).json('Password must be at least :' + '<br>' + 'minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1');
    }

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
        res.status(400).json('User already existing.');
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await User.create({
                name: req.body.name,
                last_name: req.body.last_name,
                birth: req.body.birth,
                adress: req.body.adress,
                zip_code: req.body.zip_code,
                city: req.body.city,
                country: req.body.country,
                country_code: req.body.country_code,
                phone: req.body.phone,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                image: req.file.filename
            })
            res.json('Account created');
        } catch (error) {
            console.log(error);
        }
    }
}



export const login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const validEmail = validator.isEmail(email);
    const validPassword = validator.isStrongPassword(password);

    if (!validEmail) {
        res.status(400).json('Invalid email.');
    }

    if (!validPassword) {
        res.status(400).json('Password must be at least :' + '<br>' + 'minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1');
    }

    const userExists = await User.findOne({ email: email });

    if (!userExists) {
        res.status(400).json('Invalid email or password.');
    } else {
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) {
            res.status(400).json('Invalid email or password.');
        } else {
            const token = jwt.sign({
                userId: userExists._id,
                user: userExists.username,
                image: userExists.image
            },
                process.env.SECRET_KEY,
                { expiresIn: '3h' }
            );
            res.cookie('token', token);
            res.json(token);
        }
    }
}


export const getUser = async (req, res) => {

    const id = req.params.id;

    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            res.status(400).json({ error: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
}


export const updateUser = async (req, res) => {

    const id = req.params.id;

    if (!req.file) {
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            last_name: req.body.last_name,
            birth: req.body.birth,
            adress: req.body.adress,
            zip_code: req.body.zip_code,
            city: req.body.city,
            phone: req.body.phone,
            username: req.body.username,
            email: req.body.email,
        })
    } else {
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            last_name: req.body.last_name,
            birth: req.body.birth,
            adress: req.body.adress,
            zip_code: req.body.zip_code,
            city: req.body.city,
            phone: req.body.phone,
            username: req.body.username,
            email: req.body.email,
            image: req.file.filename
        })
    }
    res.status(200).json('Profile updated.');
}