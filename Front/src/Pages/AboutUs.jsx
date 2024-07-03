import { Col, Container, Row } from "react-bootstrap"
import set1 from '../assets/about-img/set1.jpg'
import set2 from '../assets/about-img/set2.jpg'
import trait from '../assets/about-img/trait.png'
import founder from '../assets/team/founder.png'
import dev1 from '../assets/team/dev1.jpeg'
import dev2 from '../assets/team/dev2.jpg'
import dev3 from '../assets/team/dev3.png'
import dev4 from '../assets/team/dev4.jpeg'
import dev5 from '../assets/team/dev5.jpg'


function AboutUs() {
  return (
    <>
      <section className="aboutUsSection1 pt-5 pb-5">
        <Container>
          <Row>
            <Col>
              <h2 style={{ fontWeight: 'bold' }}>WHO WE ARE</h2>
              <img src={trait} alt="trait jaune" className='trait' />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, expedita hic! Fugiat qui ad voluptate eum, saepe mollitia. Obcaecati commodi corrupti quisquam doloribus earum corporis. Omnis excepturi mollitia reiciendis quo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur recusandae facilis est tenetur quo consequatur, ex debitis asperiores, aliquam sequi similique aspernatur. Earum quibusdam ab hic, veniam iure laborum iste!</p>
            </Col>

            <Col>
              <div className="gamingSets">
                <img src={set2} alt="gaming set 2" className="gSet2" />
                <img src={set1} alt="gaming set 1" className="gSet1" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="aboutUsSection2 pt-5 pb-5">
        <Container>
          <h2 style={{ fontWeight: 'bold' }}>OUR EXPERTS TEAM</h2>
          <img src={trait} alt="trait jaune" className='trait' />
        </Container>
        <Container>
          <Row>
            <Col lg='4'>
              <div className="teamBlock">
                <img src={founder} alt="founder" className="teamPic"/>
                <div className="memberDescription">
                  <h3>Brice Vienne</h3>
                  <p>Founder</p>
                </div>
              </div>
            </Col>
            <Col lg='4'>
              <div className="teamBlock">
                <img src={dev1} alt="dev1"   className="teamPic"/>
                <div className="memberDescription">
                  <h3>Konne Backfield</h3>
                  <p>CEO</p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="teamBlock">
                <img src={dev2} alt="dev2"   className="teamPic"/>
                <div className="memberDescription">
                  <h3>Karl Earl</h3>
                  <p>CTO</p>
                </div>
              </div>
            </Col>
            <Col lg='4'>
              <div className="teamBlock">
                <img src={dev3} alt="dev3"  className="teamPic" />
                <div className="memberDescription">
                  <h3>Jenna Hart</h3>
                  <p>Developer</p>
                </div>
              </div>
            </Col>
            <Col lg='4'>
              <div className="teamBlock">
                <img src={dev4} alt="dev4"  className="teamPic" />
                <div className="memberDescription">
                  <h3>Slim Toumi</h3>
                  <p>Developer</p>
                </div>
              </div>
            </Col>
            <Col lg='4'>
              <div className="teamBlock">
                <img src={dev5} alt="dev5" className="teamPic" />
                <div className="memberDescription">
                  <h3>Rosa Williams</h3>
                  <p>Sales Manager</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default AboutUs