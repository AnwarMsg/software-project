import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DriverDashboard from './pages/DriverDashboard';
import OfferRideForm from './pages/OfferRideForm';
import UserProfile from './pages/UserProfile';
import Home from './pages/Home';
import Account from './pages/Account';
import PostRide from './pages/PostRide';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/account" element={<Account />} /> 
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/DriverDashboard" element={<DriverDashboard />} />
        <Route path="/offer-ride" element={<OfferRideForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/post-ride" element={<PostRide />} />
      </Routes>
    </Router>
  );
}

export default App;