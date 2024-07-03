import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { shopCart } from "../features/shopSlice";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'http://localhost:1530'

const PayButton = () => {

    const navigate = useNavigate();
    const cart = useSelector(shopCart);
    const [user, setUser] = useState('');
    const token = Cookies.get('token');

    let decoded;

    useEffect(() => {
        if (token) {
            decoded = jwtDecode(token);
            setUser(decoded.userId);
        }
    }, [token]);

    const handleCheckout = () => {

        if (!token) {
            navigate('login');
        } else {
            axios.post(`${BASE_URL}/create-checkout-session`, {
                cartItems: cart,
                userId: user
            })
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err.message));
        }
    };
    

    return (
        <>
            <button className="paymentBtn" onClick={() => handleCheckout()}>Proceed to payment</button>
        </>
    );
};

export default PayButton;