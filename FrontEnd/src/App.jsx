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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DriverDashboard />} />
        <Route path="/offer-ride" element={<OfferRideForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/post-ride" element={<PostRide />} />
      </Routes>
    </Router>
  );
}

export default App;