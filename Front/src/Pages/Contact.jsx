import { Col, Container, Row } from "react-bootstrap"
import trait from '../assets/about-img/trait.png'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Contact() {
  return (
    <>
      <section className="bg-Map"></section>

      <section className="contactForm pb-5">
        <Container>
          <Row>
            <Col className="col1">
              <h2>ADDRESS <span>INFORMATION</span></h2>
              <img src={trait} alt="trait jaune" className='trait' />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nemo mollitia amet ducimus quia unde facilis inventore. Atque consequuntur omnis ipsa sed, repellat sunt aliquam quae quam illo, itaque nam.</p>
              <Row className="mt-5">
                <Col>
                  <h4>MONTPELLIER, FRANCE</h4>
                  <ul>
                    <li>5, Rue Victor Hugo</li>
                    <li>Building D</li>
                    <li>Monday-Friday : 8.30am - 6pm</li>
                    <li>+ 33 6 12 34 45 67</li>
                    <li>montpellier@houseofgamers.com</li>
                  </ul>
                </Col>
                <Col>
                  <h4>TOULOUSE, FRANCE</h4>
                  <ul>
                    <li>15, Port Saint-Sauveur</li>
                    <li>Building A</li>
                    <li>Monday-Friday : 8.30am - 6pm</li>
                    <li>+ 33 6 12 34 45 67</li>
                    <li>toulouse@houseofgamers.com</li>
                  </ul>
                </Col>
              </Row>
            </Col>

            <Col className="theForm">
              <h2>GET IN TOUCH & <span>INFORM US</span></h2>
              <img src={trait} alt="trait jaune" className='trait' />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nemo mollitia amet ducimus quia unde facilis inventore. Atque consequuntur omnis ipsa sed, repellat sunt aliquam quae quam illo, itaque nam.</p>

              <Form.Control size="lg" type="text" placeholder="Your Name" className="mb-4"/>
              <Row className="mb-4">
                <Col><Form.Control type="email" placeholder="Email" /></Col>
                <Col><Form.Control type="text" placeholder="Subject" /></Col>
              </Row>

              <Form.Control as="textarea" rows={4} placeholder="Write comments" className="mb-4"/>
              <Button variant="warning">Submit</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Contact