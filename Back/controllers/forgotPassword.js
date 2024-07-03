import User from "../models/userModel.js";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();



const forgotPassword = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });
    
     if (!user) {
        res.status(400).json({ message: 'User not found.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    console.log(user);
    await user.save();


    const resetUrl = `http://localhost:5173/resetPassword?token=${resetToken}`;
    var transporter = createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.HOTMAIL_USERNAME,
            pass: process.env.HOTMAIL_PASSWORD
        },
        logger: true,
        debug: true
    })

    var mailOptions = {
        from: process.env.HOTMAIL_USERNAME,
        to: email,
        subject: 'Reset your password',
        html: `<h1>Forgot your password ? No worries, here's the link to reset it !</h1>
        <h2>To do so, click on the link below : </h2><h3>${resetUrl}</h3>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Failed to send email', error: error.toString() });
        } else {
            console.log('Email sent' + info.response);
            return res.status(200).json({ message: 'A link to reset your password has been sent to your email. Sometimes you can receive it in your spams.' })
        }
    });
    res.status(200).json({ message: 'A link to reset your password has been sent to your email. Sometimes you can receive it in your spams.' });
}



const resetPassword = async (req, res) => {

    const { token, password } = req.body;

    console.log('token: ', token);
    const user = await User.findOne({ resetToken: token });

    if (!user) {
        return res.status(400).json({ message: 'Invalid token.' });
    }


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
}


export { forgotPassword, resetPassword };