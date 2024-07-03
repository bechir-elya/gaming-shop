import { useEffect, useState } from "react";
import Products from "../Components/Products";
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import dreamPc from "../assets/imgs/dream-pc.jpg";
import asusPromo from "../assets/imgs/asus-promo.webp";
import carteGraph from "../assets/imgs/cartes-graphiques.webp";
import radeonAmd from "../assets/imgs/amd-radeon.webp";
import geforce from "../assets/imgs/geforce.webp";
import Button from 'react-bootstrap/Button';


function Shop() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const retrieveProducts = async () => {
            try {
                const response = await axios.get('http://localhost:1530/shop');
                setProducts(response.data.products);
            } catch (error) {
                console.log(error);
            }
        }
        retrieveProducts();
    }, [])

    return (
        <>
            <main className="shopPage">
                <Carousel className="topCarousel">
                    <Carousel.Item>
                        <img
                            className="firstImg d-block"
                            src={dreamPc}
                            alt="First slide"
                        />
                        <div className="dreamPC">
                            <h3>DREAM PC</h3>
                            <h5>START CUSTOMIZING NOW</h5>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci eligendi suscipit iusto.</p>
                            <Button variant="success">START</Button>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src={asusPromo}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src={carteGraph}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src={radeonAmd}
                            alt="Fourth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src={geforce}
                            alt="Fifth slide"
                        />
                    </Carousel.Item>
                </Carousel>


                <Container>
                    <h1>Welcome to the shop !</h1>
                    <Row>
                        {products && products.map((item, index) => (
                            <Products key={index} item={item} />
                        ))}
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default Shop