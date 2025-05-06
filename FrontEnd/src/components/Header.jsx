import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">DriveMe</Link>
        <nav className="nav">
          <Link to="/driver" className="nav-link">Driver</Link>
          <Link to="/account" className="nav-link">Account</Link>
          <Link to="/signin" className="nav-link sign-in">Sign In</Link>
          <Link to="/signup" className="nav-link sign-up">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;