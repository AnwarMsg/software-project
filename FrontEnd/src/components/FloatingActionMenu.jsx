import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const FloatingActionMenu = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    setIsAuthenticated(true); // Force authenticated state for testing
    setIsDriver(localStorage.getItem("isDriver") === "true");
  }, []);

  return (
    <>
      <SpeedDial
        ariaLabel="Navigation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          '& .MuiFab-primary': {
            backgroundColor: '#14653c',
            '&:hover': {
              backgroundColor: '#0f4d2c',
            },
          }
        }}
        icon={<SpeedDialIcon />}
        direction="up"
      >
        <SpeedDialAction
          icon={<DriveEtaIcon />}
          tooltipTitle="Driver"
          onClick={(event) => {
            if (!isDriver) {
              setAnchorEl(event.currentTarget);
              setPopupMessage("You are not a driver. Become a driver to access this section.");
            } else {
              navigate('/driver');
            }
          }}
        />
        <SpeedDialAction
          icon={<AccountCircleIcon />}
          tooltipTitle="Account"
          onClick={(event) => {
            if (!isAuthenticated) {
              setAnchorEl(event.currentTarget);
              setPopupMessage("You must be signed in to access your account.");
            } else {
              navigate('/account');
            }
          }}
        />
      </SpeedDial>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
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
        <Typography sx={{ mb: 1 }}>{popupMessage}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button size="small" onClick={() => setAnchorEl(null)} color="inherit">Close</Button>
        </Box>
      </Popover>
    </>
  );
};

export default FloatingActionMenu;