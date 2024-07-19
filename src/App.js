import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from "./components/PrivateRoute";
import Explore from "./pages/Explore"
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Category from "./pages/Category";
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from "./components/Navbar";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />} >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-listing" element={<CreateListing />} /> 
          <Route path="/edit-listing/:listingId" element={<EditListing />} /> 
          <Route path="/category/:categoryName/:listingId" element={<Listing />} />
          <Route path="/contact/:landlordId" element={<Contact />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer autoClose={5000} />
    </>
  );
}

export default App;
