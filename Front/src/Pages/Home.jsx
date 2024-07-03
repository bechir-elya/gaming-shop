import { Col, Container, Row } from 'react-bootstrap'
import houseLogo from '../assets/brands/brand-logo-no-bg.png'
import Button from 'react-bootstrap/Button';
import aboutimg1 from '../assets/about-img/about-img1.jpg'
import aboutimg2 from '../assets/about-img/about-img2.jpg'
import aboutimg3 from '../assets/about-img/about-img3.png'
import aboutimg4 from '../assets/about-img/about-img4.png'
import trait from '../assets/about-img/trait.png'
import { FaRegCheckCircle } from "react-icons/fa";
import { TbView360Number } from "react-icons/tb";
import { GiOnTarget } from "react-icons/gi";
import { TbTournament } from "react-icons/tb";
import Card from 'react-bootstrap/Card';
import baldur from '../assets/about-img/Baldurs-gate.jpg'
import elden from '../assets/about-img/elden-ring.jpg'
import lol from '../assets/about-img/lol1.jpg'
import apex from '../assets/about-img/apex-legends.jpg'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

function HomePage() {

    const [userConnected, setUserConnected] = useState(false);
    const token = Cookies.get('token');
    let decoded;

    useEffect(() => {
        if (token) {
            decoded = jwtDecode(token);
            setUserConnected(true);
        }
    })

    return (
        <>
            <section className="section1">
                <div>
                    <Container>
                        <img src={houseLogo} alt="logo marque" />
                        <h1 className='homePageTitle'>ARE YOU READY FOR YOUR NEXT CHALLENGE ?</h1>
                        <div className='d-flex'>
                            <Button variant="warning" style={{ marginRight: '2%' }}><Link to={'aboutus'} target='_blank'>READ MORE</Link></Button>
                            <Button variant="warning" style={{display: userConnected ? 'none' : 'inline-block'}}><Link to={'register'} target='_blank'>REGISTER</Link></Button>
                        </div>
                    </Container>
                </div>
            </section>

            <section className='section2'>
                <Container>
                    <Row>
                        <Col>
                            <div className='picBlock'>
                                <div className='experiences'>
                                    <img src={aboutimg4} alt="ten years experience" className='spinImg' />
                                    <span className='ten'>10</span>
                                </div>
                                <img src={aboutimg1} alt="img1" className='gaminGirl' />
                                <img src={aboutimg2} alt="img2" className='gaminMan' />
                                <img src={aboutimg3} alt="img3" className='diamonds' />
                            </div>
                        </Col>
                        <Col>
                            <h2>WE'RE THE BEST GAMING <span>COMPANY</span></h2>
                            <img src={trait} alt="trait jaune" className='trait' />
                            <p><b>LPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.</b></p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            <ul className='check'>
                                <li><FaRegCheckCircle style={{ color: 'yellow', marginRight: '1%' }} />Suspe ndisse suscipit sagittis leo.</li>
                                <li><FaRegCheckCircle style={{ color: 'yellow', marginRight: '1%' }} />Entum estibulum dignissim posuere.</li>
                                <li><FaRegCheckCircle style={{ color: 'yellow', marginRight: '1%' }} />If you are going to use a passage</li>
                            </ul>
                            <Button variant="outline-warning"><a href='' target='_blank'>DISCOVER MORE</a></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='4'>
                            <div className='services-box'>
                                <div className='d-flex align-items-center mb-4 justify-content-center'>
                                    <TbView360Number className='boxIcons' />
                                    <h5>Live Streaming</h5>
                                </div>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                            </div>
                        </Col>
                        <Col lg='4'>
                            <div className='services-box'>
                                <div className='d-flex align-items-center mb-4 justify-content-center'>
                                    <GiOnTarget className='boxIcons' />
                                    <h5>Gaming News</h5>
                                </div>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                            </div>
                        </Col>
                        <Col lg='4'>
                            <div className='services-box'>
                                <div className='d-flex align-items-center mb-4 justify-content-center'>
                                    <TbTournament className='boxIcons' />
                                    <h5>Composition</h5>
                                </div>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='section3'>
                <Container className='p-5'>
                    <h2 className='trendingGames'>TRENDING <span>GAMES</span></h2>
                    <img src={trait} alt="trait jaune" className='trait' />
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={baldur} />
                                <Card.Body>
                                    <Card.Title>Baldur's Gate 3</Card.Title>
                                    <Card.Text>
                                        A role-playing video game set in the Dungeons & Dragons universe, where players embark on an epic journey filled with adventure, exploration, and strategic turn-based combat, as they navigate a richly detailed fantasy world teeming with monsters, magic, and intrigue.
                                    </Card.Text>
                                    <Button variant="primary"><a href="https://baldursgate3.game/" target='_blank'>Discover and play !</a></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={elden} />
                                <Card.Body>
                                    <Card.Title>Elden Ring</Card.Title>
                                    <Card.Text>
                                        An action role-playing game set in a vast, dark fantasy world, where players explore an interconnected open-world, battle formidable enemies, and unravel a complex narrative crafted by the collaboration between Hidetaka Miyazaki and George R. R. Martin.
                                    </Card.Text>
                                    <Button variant="primary"><a href="https://en.bandainamcoent.eu/elden-ring/elden-ring#shop-now" target='_blank'>Discover and play !</a></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={lol} />
                                <Card.Body>
                                    <Card.Title>League of Legends</Card.Title>
                                    <Card.Text>
                                        A multiplayer online battle arena (MOBA) game where teams of champions with diverse abilities battle against each other to destroy the opposing team's nexus, set in a fantasy world of magic and strategy.
                                    </Card.Text>
                                    <Button variant="primary"><a href="https://www.leagueoflegends.com/en-gb/" target='_blank'>Discover and play !</a></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={apex} />
                                <Card.Body>
                                    <Card.Title>Apex Legends</Card.Title>
                                    <Card.Text>
                                        A free-to-play battle royale game where legendary characters with unique abilities compete in squads to become the last team standing on a vibrant, futuristic island.
                                    </Card.Text>
                                    <Button variant="primary"><a href="https://www.ea.com/fr-fr/games/apex-legends" target='_blank'>Discover and play !</a></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='section4'>
                <h3 style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>JOIN OUR <span>COMMUNITY</span> AND GET ALL THE <span>BENEFITS</span></h3>
                <p>Access to Exclusive Content, Exclusive Events and Workshops, Discounts and Deals, Early Access and Sneak Peeks, Community Forums or Groups and many more ! </p>
                <button><a href='' target='_blank'>JOIN NOW</a></button>
            </section>
        </>
    )
}

export default HomePage