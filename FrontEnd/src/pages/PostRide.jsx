import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Header from '../components/Header';

export default function PostRide() {
  const [ride, setRide] = useState({
    from: '',
    to: '',
    datetime: new Date(),
    seats: '',
    price: '',
    notes: '',
    carModel: '',
    licensePlate: '',
    carColor: '',
    customColor: '',
    carImage: null,
  });

  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    setRide({ ...ride, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setRide({ ...ride, datetime: newDate });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRide({ ...ride, carImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCarColor = ride.carColor === 'Custom' ? ride.customColor : ride.carColor;
    const rideData = { ...ride, carColor: finalCarColor };
    console.log('Ride posted:', rideData);
    alert('Ride posted successfully!');
  };

  return (
    <Box sx={{minHeight: '100vh', py: 6, marginTop: '100px' }}>
      <Header />
      <Container maxWidth="lg">
        <Paper elevation={16} sx={{ p: 4, borderRadius: 4 }}>
          <h1>
            Post a New Ride
          </h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Ride Info */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'darkgreen' }}>
                  Ride Information
                </Typography>
                <TextField name="from" label="From" fullWidth required variant="outlined" value={ride.from} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField name="to" label="To" fullWidth required variant="outlined" value={ride.to} onChange={handleChange} sx={{ mb: 2 }} />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Date & Time"
                    value={ride.datetime}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField fullWidth required {...params} sx={{ mb: 2 }} />}
                  />
                </LocalizationProvider>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField name="seats" label="Seats" type="number" fullWidth required value={ride.seats} onChange={handleChange} sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="price"
                      label="Price (MAD)"
                      type="number"
                      fullWidth
                      required
                      value={ride.price}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">MAD</InputAdornment>,
                      }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>
                <TextField name="notes" label="Notes" multiline rows={3} fullWidth value={ride.notes} onChange={handleChange} sx={{ mb: 2 }} />
              </Grid>

              {/* Vehicle Info */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'darkgreen' }}>
                  Vehicle Information
                </Typography>
                <TextField name="carModel" label="Car Model" fullWidth required variant="outlined" value={ride.carModel} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField name="licensePlate" label="License Plate" fullWidth required variant="outlined" value={ride.licensePlate} onChange={handleChange} sx={{ mb: 2 }} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="car-color-label">Car Color</InputLabel>
                  <Select
                    labelId="car-color-label"
                    name="carColor"
                    value={ride.carColor}
                    onChange={handleChange}
                    label="Car Color"
                    required
                  >
                    <MenuItem value="Red">Red</MenuItem>
                    <MenuItem value="Blue">Blue</MenuItem>
                    <MenuItem value="Black">Black</MenuItem>
                    <MenuItem value="White">White</MenuItem>
                    <MenuItem value="Silver">Silver</MenuItem>
                    <MenuItem value="Custom">Custom</MenuItem>
                  </Select>
                </FormControl>

                {ride.carColor === 'Custom' && (
                  <TextField
                    name="customColor"
                    label="Enter Custom Color"
                    fullWidth
                    required
                    variant="outlined"
                    value={ride.customColor}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                )}

                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{
                    backgroundColor: 'darkgreen',
                    color: '#fff',
                    borderRadius: 2,
                    mb: 2,
                    '&:hover': { backgroundColor: '#006400' },
                  }}
                >
                  Upload Car Image
                  <input hidden type="file" accept="image/*" onChange={handleImageChange} />
                </Button>

                {ride.carImage && (
                  <Box
                    sx={{
                      mt: 2,
                      width: '100%',
                      height: 200,
                      backgroundImage: `url(${ride.carImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 2,
                    }}
                  />
                )}
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: 'darkgreen',
                    color: '#fff',
                    borderRadius: 3,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: '#006400',
                    },
                  }}
                >
                  Post Ride
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
