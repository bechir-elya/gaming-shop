import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import brandLogo from '../assets/brands/wolf.jpg'
import ShopCart from './ShopCart';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { isLogged, setUserConnected, setUserDisconnected } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userConnected = useSelector(isLogged);
    const [user, setUser] = useState('')
    
    const [userName, setUserName] = useState('');
    const token = Cookies.get('token');
    let decoded;

    useEffect(() => {
        if (token) {
            decoded = jwtDecode(token);
            setUserName(decoded.user);
            setUser(decoded.userId);
            dispatch(setUserConnected());
        }
    }, [userConnected])

    const disconnect = () => {
        dispatch(setUserDisconnected());
        location.reload();
        navigate('/');
    }

    return (
        <header>
            <Navbar className="bg-black">
                <Container>
                    <Navbar.Brand href="#home" className='text-white'><img src={brandLogo} alt="logo" className='brandLogo' /></Navbar.Brand>
                    <div className='d-flex justify-content-around' style={{ width: '100%' }}>
                        <Link to={'/'} style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Home</Link>
                        <Link to={'aboutus'} style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>About us</Link>
                        <Link to={'shop'} style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Shop</Link>
                        <Link to={'contact'} style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Contact</Link>
                        <p style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', display: userConnected ? 'inline-block' : 'none' }}>Welcome, <Link to={`profile/${user}`} style={{color: '#ffc010'}}>{userName}</Link></p>
                        <Link to={'login'} style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', display: userConnected ? 'none' : 'inline-block' }}>Login</Link>
                        <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', display: userConnected ? 'inline-block' : 'none' }} onClick={disconnect}>Logout</Link>
                    </div>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text style={{ color: 'white' }}>
                            <ShopCart />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
