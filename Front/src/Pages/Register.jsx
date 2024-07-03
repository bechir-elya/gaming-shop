import { Col, Container, Row } from 'react-bootstrap'
import houseLogo from '../assets/brands/brand-logo-no-bg.png'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FileInput from '../Components/fileInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {

  const [name, setName] = useState('');
  const [last_name, setLast_name] = useState('');
  const [birth, setBirth] = useState('');
  const [adress, setAdress] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [country_code, setCountry_code] = useState('');
  const [phone, setPhone] = useState('');

  const [username, setUsername] = useState('');
  const [errorUsername, setErrorUsername] = useState('');

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [image, setImage] = useState('');

  const [error, setError] = useState(true);


  useEffect(() => {
    if (username.length < 6 && username.length > 0) {
      setErrorUsername('Username must be at least 6 characters.');
      setError(true);
    } else if (username.length >= 6) {
      setErrorUsername('');
      setError(false);
    } else {
      setErrorUsername('');
      setError(true);
    }

    if (!email.match(mailFormat)) {
      if (email.length > 0) {
        setErrorEmail('Invalid email.');
      } else {
        setErrorEmail('');
      }
      setError(true);
    } else {
      setError(false);
      setErrorEmail('');
    }

    if (password.length < 8 && password.length > 0) {
      setErrorPassword('Password must be 8 characters minimum with at least 1 lower case, 1 upper case, 1 number and 1 symbol.');
      setError(true);
    } else if (password.length >= 8) {
      setErrorPassword('');
      setError(false);
    }

  }, [username, email, password]);


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('last_name', last_name);
    formData.append('birth', birth);
    formData.append('adress', adress);
    formData.append('zip_code', zip_code);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('country_code', country_code);
    formData.append('phone', phone);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:1530/register', formData);
      setName('');
      setLast_name('');
      setBirth('');
      setAdress('');
      setZip_code('');
      setCity('');
      setCountry('');
      setCountry_code('');
      setPhone('');
      setUsername('');
      setEmail('');
      setPassword('');
      setImage('');
      toast.success('Your account has been created, you can now log in ! 💪', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className='registerPage'>
        <Container>
          <Row>
            <Col className='registerLeft'>
              <img src={houseLogo} alt="logo marque" />
            </Col>
            <Col className='registerRight'>
              <div className='titles'>
                <h2>REGISTER</h2>
                <h6>JOIN OUR COMMUNITY !</h6>
              </div>

              <Form onSubmit={handleOnSubmit} encType='multipart/form-data'>
                <Row>
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Col>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Last name" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                  </Col>
                </Row>

                <Form.Label>Date of Birth</Form.Label>
                <input type="date" className='dateOfBirth' value={birth} onChange={(e) => setBirth(e.target.value)} />

                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Username" style={{ borderColor: username.length < 6 && username.length > 0 ? 'red' : username.length >= 6 ? 'green' : username.length == 0 ? 'none' : 'none' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                <span style={{color: 'red', fontWeight: 'bold'}}>{errorUsername}</span>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" style={{ borderColor: !email.match(mailFormat) && email.length > 0 ? 'red' : email.match(mailFormat) ? 'green' : 'none' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span style={{color: 'red', fontWeight: 'bold'}}>{errorEmail}</span>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" style={{ borderColor: password.length < 8 && password.length > 0 ? 'red' : password.length >= 8 ? 'green' : 'none' }} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span style={{color: 'red', fontWeight: 'bold'}}>{errorPassword}</span>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridPhone1">
                    <Form.Label>Country Code</Form.Label>
                    <Form.Control as="select" value={country_code} onChange={(e) => setCountry_code(e.target.value)}>
                      <option>Choose...</option>
                      <option value="+43">+43 Austria</option>
                      <option value="+32">+32 Belgium</option>
                      <option value="+359">+359 Bulgaria</option>
                      <option value="+385">+385 Croatia</option>
                      <option value="+357">+357 Cyprus</option>
                      <option value="+420">+420 Czech Republic</option>
                      <option value="+45">+45 Denmark</option>
                      <option value="+372">+372 Estonia</option>
                      <option value="+358">+358 Finland</option>
                      <option value="+33">+33 France</option>
                      <option value="+49">+49 Germany</option>
                      <option value="+30">+30 Greece</option>
                      <option value="+36">+36 Hungary</option>
                      <option value="+353">+353 Ireland</option>
                      <option value="+39">+39 Italy</option>
                      <option value="+371">+371 Latvia</option>
                      <option value="+370">+370 Lithuania</option>
                      <option value="+352">+352 Luxembourg</option>
                      <option value="+356">+356 Malta</option>
                      <option value="+31">+31 Netherlands</option>
                      <option value="+48">+48 Poland</option>
                      <option value="+351">+351 Portugal</option>
                      <option value="+40">+40 Romania</option>
                      <option value="+421">+421 Slovakia</option>
                      <option value="+386">+386 Slovenia</option>
                      <option value="+34">+34 Spain</option>
                      <option value="+46">+46 Sweden</option>
                      <option value="+1">+1 United States</option>
                      <option value="+1">+1 Canada</option>
                      <option value="+52">+52 Mexico</option>
                      <option value="+44">+44 United Kingdom</option>
                      <option value="+61">+61 Australia</option>
                      <option value="+64">+64 New Zealand</option>
                      <option value="+81">+81 Japan</option>
                      <option value="+86">+86 China</option>
                      <option value="+91">+91 India</option>
                      <option value="+55">+55 Brazil</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPhone2">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" value={adress} onChange={(e) => setAdress(e.target.value)} />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={city} onChange={(e) => setCity(e.target.value)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Country</Form.Label>
                    <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
                      <option>Choose...</option>
                      <option value="Austria">Austria</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Greece">Greece</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Italy">Italy</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Malta">Malta</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Romania">Romania</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Spain">Spain</option>
                      <option value="Sweden">Sweden</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="Brazil">Brazil</option>
                    </Form.Select>

                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control value={zip_code} onChange={(e) => setZip_code(e.target.value)} />
                  </Form.Group>
                </Row>

                <div>
                  <FileInput setImage={setImage} />
                  {image && <p>Selected file: {image.name}</p>}
                </div>

                <Button variant="primary" type="submit" disabled={error ? true : false}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Register