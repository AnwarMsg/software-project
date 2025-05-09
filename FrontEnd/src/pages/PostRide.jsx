import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Button, Typography, Paper, Box, IconButton, FormControl, Select, MenuItem, InputLabel, InputAdornment } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PhotoCamera } from '@mui/icons-material';
import Header from '../components/Header';
import { useTheme } from '@mui/material/styles';

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
    console.log('Ride posted:', ride);
    alert('Ride posted successfully!');
  };

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            backgroundColor: '#ffffff',
            borderRadius: 3,
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
            borderTop: `4px solid ${theme.palette.primary.main}`,
            transition: 'all 0.3s ease',
            '&:hover': { boxShadow: '0px 12px 36px rgba(0, 0, 0, 0.2)' },
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.main }}>
            Post a New Ride
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Ride Information Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, marginBottom: 2 }}>
                  Ride Information
                </Typography>
                <TextField
                  name="from"
                  label="From (Departure)"
                  fullWidth
                  variant="outlined"
                  value={ride.from}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                    '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: theme.palette.primary.main },
                      '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
                <TextField
                  name="to"
                  label="To (Destination)"
                  fullWidth
                  variant="outlined"
                  value={ride.to}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                    '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: theme.palette.primary.main },
                      '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Date & Time"
                    value={ride.datetime}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required variant="outlined" sx={{ marginBottom: 2 }} />
                    )}
                  />
                </LocalizationProvider>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="seats"
                      label="Available Seats"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={ride.seats}
                      onChange={handleChange}
                      required
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="price"
                      label="Price per Seat (MAD)"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={ride.price}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <InputAdornment position="start">MAD</InputAdornment>,
                      }}
                      sx={{
                        marginBottom: 2,
                        '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: theme.palette.primary.main },
                          '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                          transition: 'all 0.3s ease',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  name="notes"
                  label="Additional Notes"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  value={ride.notes}
                  onChange={handleChange}
                  sx={{
                    marginBottom: 2,
                    '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: theme.palette.primary.main },
                      '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                    },
                  }}
                />
              </Grid>

              {/* Vehicle Information Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, marginBottom: 2 }}>
                  Vehicle Information
                </Typography>
                <TextField
                  name="carModel"
                  label="Car Model"
                  fullWidth
                  variant="outlined"
                  value={ride.carModel}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                    '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: theme.palette.primary.main },
                      '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
                <TextField
                  name="licensePlate"
                  label="License Plate"
                  fullWidth
                  variant="outlined"
                  value={ride.licensePlate}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: 2,
                    '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: theme.palette.primary.main },
                      '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel id="car-color-label" sx={{ color: theme.palette.primary.main }}>
                    Car Color
                  </InputLabel>
                  <Select
                    labelId="car-color-label"
                    name="carColor"
                    value={ride.carColor}
                    onChange={handleChange}
                    label="Car Color"
                    fullWidth
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme.palette.primary.main },
                        '&:hover fieldset': { borderColor: theme.palette.primary.dark },
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <MenuItem value="Red">Red</MenuItem>
                    <MenuItem value="Blue">Blue</MenuItem>
                    <MenuItem value="Black">Black</MenuItem>
                    <MenuItem value="White">White</MenuItem>
                    <MenuItem value="Silver">Silver</MenuItem>
                  </Select>
                </FormControl>

                {/* Car Image Upload */}
                <Box sx={{ marginBottom: 4 }}>
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    fullWidth
                    startIcon={<PhotoCamera />}
                    sx={{
                      backgroundColor: theme.palette.primary.dark, // Darker green
                      borderRadius: '30px',
                      '&:hover': { backgroundColor: theme.palette.primary.main },
                      transition: 'all 0.3s ease',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                      padding: '12px 30px',
                    }}
                  >
                    Upload Car Image
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                  </Button>
                  {ride.carImage && (
                    <Box
                      sx={{
                        marginTop: 2,
                        width: '100%',
                        height: '200px',
                        backgroundImage: `url(${ride.carImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 2,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>

            {/* Submit Button at the Bottom */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: theme.palette.primary.dark, // Darker green
                  borderRadius: '30px', // Oval button
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                  transition: 'all 0.3s ease',
                  padding: '12px 30px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                Post Ride
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
