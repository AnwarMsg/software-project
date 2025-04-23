import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="bg-gray-100 h-screen p-4 w-48">
    <nav className="flex flex-col gap-4">
      <Link to="/dashboard">🏠 Dashboard</Link>
      <Link to="/offer-ride">🚗 Offer Ride</Link>
      <Link to="/profile">👤 Profile</Link>
      <Link to="/logout">🚪 Logout</Link>
    </nav>
  </div>
);

export default Sidebar;
