import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Shop from './Pages/Shop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import ResetPassword from './Pages/ResetPassword';
import CheckoutSuccess from './Pages/CheckoutSuccess';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='aboutus' element={<AboutUs />} />
        <Route path='contact' element={<Contact />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='shop' element={<Shop />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='profile/:id' element={<Profile />} />
        <Route path='resetpassword' element={<ResetPassword />} />
      </Routes>
      <Footer/>
      <ToastContainer />
    </>
  )
}

export default App
