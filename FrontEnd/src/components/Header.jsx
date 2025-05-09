import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { UserContext } from '../components/UserContext.jsx'; // adjust the path based on actual file location

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(UserContext);
  const [initials, setInitials] = useState(() => {
    const firstLetter = user?.firstName?.[0]?.toUpperCase() || '';
    const lastLetter = user?.lastName?.[0]?.toUpperCase() || '';
    return `${firstLetter}${lastLetter}`;
  });

  useEffect(() => {
    const firstLetter = user?.firstName?.[0]?.toUpperCase() || '';
    const lastLetter = user?.lastName?.[0]?.toUpperCase() || '';
    setInitials(`${firstLetter}${lastLetter}`);
  }, [user?.firstName, user?.lastName]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box>
      <AppBar style={{ background: '#14653c' }}>
        <div className="header-content">
          <Link to="/" className="logo">DriveMe</Link>
          <nav className="nav" style={{ marginLeft: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', pr: 4 }}>
              <Button
                variant="contained"
                onClick={() => {
                  if (!user) {
                    alert("Please log in to access your account.");
                  } else {
                    window.location.href = "/account";
                  }
                }}
                sx={{
                  backgroundColor: '#fff',
                  color: '#14653c',
                  fontWeight: 'bolder',
                  fontSize: '1.4rem',
                  textTransform: 'none',
                  borderRadius: '20px',
                  '&:hover': { backgroundColor: '#14653c', color: '#fff' }
                }}
              >
                <AccountCircleIcon />
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  const isDriver = localStorage.getItem("isDriver") === "true";
                  // if (!isDriver) {
                  //   alert("You are not a driver. Become a driver to access this section.");
                  // } else { }
                  window.location.href = "/DriverDashboard";
                  
                }}
                sx={{
                  backgroundColor: '#fff',
                  color: '#14653c',
                  fontWeight: 'bolder',
                  fontSize: '1.4rem',
                  textTransform: 'none',
                  borderRadius: '20px',
                  '&:hover': { backgroundColor: '#14653c', color: '#fff' }
                }}
              >
                <DriveEtaIcon />
              </Button>
              {user ? (
                <Button onClick={handleAvatarClick} sx={{ minWidth: 0, p: 0 }}>
                  <Avatar alt="Profile Picture" sx={{ width: 40, height: 40, bgcolor: '#fff', color: '#14653c', fontWeight: 'bold' }}>
                    {initials}
                  </Avatar>
                </Button>
              ) : (
                <Button variant="contained" href="/login" sx={{
                  backgroundColor: '#fff', color: '#14653c', fontWeight: 'bolder', fontSize: '1.4rem',
                  textTransform: 'none', borderRadius: '20px', 
                  '&:hover': {backgroundColor: '#14653c', color: '#fff'}}}>
                  <HowToRegIcon />
                </Button>
              )}
            </Box>
          </nav>
        </div>
      </AppBar>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            px: 2,
            py: 1,
            mt: 1,
          },
        }}
      >
        <Typography sx={{ mb: 1 }}>Are you sure you want to log out?</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button size="small" onClick={handleClose} color="inherit">Cancel</Button>
          <Button size="small" onClick={handleLogout} sx={{ color: '#14653c' }} autoFocus>Logout</Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default Header;