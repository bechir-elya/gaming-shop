import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserConnected } from '../features/userSlice';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const spans = Array.from({ length: 50 }, (_, i) => (
        <span key={i} style={{ '--i': i }}></span>
    ));

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');


    const logIn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:1530/login', { email, password });
            Cookies.set('token', response.data, { expires: 2 });
            dispatch(setUserConnected());
            navigate('/');
        } catch (error) {
            setError(error.response.data);
        }
    }


    return (
        <main className="loginMain">
            <div className="container loginContainer">
                <div className="login-box">
                    <h2 className="loginH2">Login</h2>
                    <form action="#">
                        <div className="input-box">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <label>Password</label>
                        </div>
                        <div className="forgot-pass">
                            <Link to={'/forgotpassword'}>Forgot your password ?</Link>
                        </div>
                        <button type="submit" className="btn loginBtn" onClick={logIn}>Login</button>
                        <p style={{fontWeight: 'bold', color: 'red'}}>{error}</p>
                        <div className="signup-link">
                            <Link to={'/register'}>Signup</Link>
                        </div>
                    </form>
                </div>
                {spans}
            </div>
        </main>
    );
}

export default Login;
