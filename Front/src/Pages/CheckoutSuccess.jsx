import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import { useNavigate } from 'react-router-dom';


const CheckoutSuccess = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 5000);
    }, [])

    return (
        <>
            <main className='purchaseSuccess'>
                <Container>
                    <Row>
                        <Col className='thanksCol'>
                            <h2>Thank you for your purchase !</h2>
                            <p>Your order has been sent to our manufacturer and your product will be on its way as soon as possible !</p>
                            <p>You will be now redirected to the homepage.</p>
                        </Col>

                        <Col>
                            <img src="https://genshin.global/wp-content/uploads/2024/02/gaming-character-avatar-profile-genshin-1.webp" alt="genshin character" />
                        </Col>
                    </Row>

                </Container>
            </main>
        </>
    );
}

export default CheckoutSuccess