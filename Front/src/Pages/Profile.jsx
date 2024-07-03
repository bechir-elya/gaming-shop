import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FileInput from '../Components/fileInput';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

function Profile() {

  const navigate = useNavigate();
  const token = Cookies.get('token');
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    last_name: '',
    birth: '',
    username: '',
    email: '',
    adress: '',
    zip_code: '',
    city: '',
    country: '',
    country_code: '',
    phone: '',
    image: '',
  });

  const [image, setImage] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);


  useEffect(() => {
    const retrieveUser = async () => {
      try {
        const response = await axios.get(`http://localhost:1530/userprofile/${id}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    retrieveUser();
  }, [id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  console.log(user);

  const editUser = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('last_name', user.last_name);
    formData.append('birth', user.birth);
    formData.append('adress', user.adress);
    formData.append('zip_code', user.zip_code);
    formData.append('city', user.city);
    formData.append('country', user.country);
    formData.append('country_code', user.country_code);
    formData.append('phone', user.phone);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('image', user.image);

    try {
      const response = await axios.put(`http://localhost:1530/updateuser/${id}`, formData);
      toast.success('Profile updated !', {
        position: "bottom-right",
        autoClose: 2000
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className='profilePage'>
        <Container>
          <Row>
            <Col className='colImg'>
              <div className='avatar'>
                {<img src={`http://localhost:1530/uploads/${user?.image}`} alt='Profile' />}
              </div>
            </Col>

            <Col className='colRight'>
              <Form onSubmit={editUser} encType='multipart/form-data'>
                <Row>
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="First name" name='name' value={user.name} onChange={handleChange} />
                  </Col>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Last name" name='last_name' value={user.last_name} onChange={handleChange} />
                  </Col>
                </Row>

                <Form.Label>Date of Birth</Form.Label>
                <input type="date" className='dateOfBirth' name='birth' value={new Date(user.birth).toLocaleDateString()} onChange={handleChange} />

                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Username" name='username' value={user.username} onChange={handleChange} />


                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={user.email} onChange={handleChange} />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridPhone1">
                    <Form.Label>Country Code</Form.Label>
                    <Form.Control as="select" name='country-code' value={user.country_code} onChange={handleChange}>
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
                    <Form.Control type="tel" name='phone' value={user.phone} onChange={handleChange} />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" name='adress' value={user.adress} onChange={handleChange} />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control name='city' value={user.city} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Country</Form.Label>
                    <Form.Select name='country' value={user.country} onChange={handleChange}>
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
                    <Form.Control name='zip_code' value={user.zip_code} onChange={handleChange} />
                  </Form.Group>
                </Row>

                <div>
                  <FileInput setImage={setImage} />
                  {image && <p>Selected file: {image.name}</p>}
                </div>
                <Button variant="none" type="submit" className='updateProfileBtn'>
                  Update Profile
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Profile