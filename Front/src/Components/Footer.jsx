import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import brandLogo from '../assets/brands/wolf.jpg'
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <footer className='foot'>
            <Container className='pt-5'>
                <Row>
                    <Col>
                    <img src={brandLogo} alt="logo house of gamers" className='brandLogo'/>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                    <p><IoLocationOutline style={{color:'white', marginRight:'2%'}} />Address :66 Broklyn Street, United States of America</p>
                    <p><FaRegClock className='fa'/>Phone :+123 456 78900</p>
                    <p><FaRegEnvelope className='fa' />Email :info@houseofgamers.com</p>
                    </Col>
                    <Col>
                    <h3>OUR LINKS</h3>
                    <div className='yellowLign'></div>
                    <div className='d-flex justify-content-around footerLinks' style={{ width:'100%'}}>
                        <a href='' style={{ color: 'white', fontWeight: 'bold', textDecoration:'none' }}>Home</a>
                        <Link to={'aboutus'} style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>About us</Link>
                        <a href='' style={{ color: 'white', fontWeight: 'bold', textDecoration:'none' }}>Shop</a>
                        <Link to={'contact'} style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Contact</Link>
                    </div>
                    </Col>
                    <Col>
                    <h3>FOLLOW US</h3>
                    <div className='yellowLign'></div>
                    <div>
                    <FaInstagramSquare className='socialMedia'/>
                    <FaSquareFacebook className='socialMedia'/>
                    <FaSquareXTwitter className='socialMedia'/>
                    </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer