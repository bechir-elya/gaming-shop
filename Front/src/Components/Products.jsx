import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import { FaShoppingCart } from "react-icons/fa";
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/shopSlice';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';


function Products({ item }) {

    const dispatch = useDispatch()

    const { name, category, images, brandImg, price } = item;

    /* const [user, setUser] = useState('');
    const token = Cookies.get('token');

    let decoded;

    useEffect(() => {
        if (token) {
            decoded = jwtDecode(token);
            setUser(decoded.userId);
            console.log(decoded.userId);
        }
    }, [token]); */

    const add = () => {
        dispatch(addToCart(item));
    }


    return (
        <>
            <Col lg='4' className='mb-4 cardHover'>
                <Card>
                    <Carousel>
                        {images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="productPics d-block"
                                    src={`http://localhost:1530/uploads/${image}`}
                                    alt={`Slide ${index}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>Category: {category.title}</Card.Text>
                        <Card.Text>
                            Brand:
                            <img src={`http://localhost:1530/uploads/${brandImg}`} alt="brand" style={{ maxWidth: '50px', marginLeft: '10px' }} />

                        </Card.Text>
                        <Card.Text>
                            {price}€
                        </Card.Text>
                    </Card.Body>
                    <div className='overLay' onClick={add}>
                        <p className='text'>Add to cart <FaShoppingCart /></p>
                    </div>
                </Card>
            </Col >
        </>
    )
}

export default Products

