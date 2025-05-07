import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">DriveMe</Link>
        <nav className="nav">
          <Link to="/driver" className="nav-link">Driver</Link>
          <Link to="/Account" className="nav-link">Account</Link>
          <Link to="/Login" className="nav-link sign-in">Sign In</Link>
          <Link to="/Register" className="nav-link sign-up">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;