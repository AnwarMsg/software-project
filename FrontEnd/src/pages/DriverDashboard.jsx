import * as React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'; // Import Link for routing
import ProfileOverview from '../components/ProfileOverview';
import UpcomingRides from '../components/UpcomingRides';
import { useAuth } from '../Hooks/useAuth';

// Styled components for the design
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#fafafa',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(3),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  '& .MuiTableCell-root': {
    borderBottom: '1px solid #ddd',
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: '#e0f7fa',
    cursor: 'pointer',
  },
}));

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: '#2d6a4f',
  padding: theme.spacing(2),
  borderRadius: '12px',
  color: 'white',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  textTransform: 'none',
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  borderRadius: '8px',
  '&:hover': {
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
}));

const NavigationBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1),
}));

const createData = (fullName, sex, price) => {
  return { fullName, sex, price };
};

const rows = [
  createData('John Doe', 'Male', 30),
  createData('Jane Smith', 'Female', 45),
  createData('Alex Johnson', 'Male', 25),
  createData('Emily Davis', 'Female', 40),
  createData('Michael Brown', 'Male', 50),
];

export default function DriverDashboard() {
  const handleAccept = (name) => {
    alert(`${name} accepted!`);
  };

  const handleDecline = (name) => {
    alert(`${name} declined!`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Navigation Bar */}
      <NavigationBar>
        <Link to="/Home" style={{ textDecoration: 'none' }}>
          <IconButton color="primary">
            <HomeIcon fontSize="large" />
          </IconButton>
        </Link>
        <Typography variant="h4">Driver Dashboard</Typography>
        <Link to="/UserProfile" style={{ textDecoration: 'none' }}>
          <IconButton color="primary">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Link>
      </NavigationBar>

      <StyledTableContainer component={Paper}>
        <StyledTable aria-label="driver dashboard table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Full Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Sex</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Price (MAD)</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.fullName}>
                <TableCell component="th" scope="row" sx={{ fontSize: '1rem' }}>{row.fullName}</TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}>{row.sex}</TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}>{row.price}</TableCell>
                <TableCell align="center">
                  <ActionButton variant="contained" color="success" onClick={() => handleAccept(row.fullName)} startIcon={<CheckIcon />}>
                    Accept
                  </ActionButton>
                  <ActionButton variant="outlined" color="error" onClick={() => handleDecline(row.fullName)} startIcon={<ClearIcon />}>
                    Decline
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </Box>
  );
}
