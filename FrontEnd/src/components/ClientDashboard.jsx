import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../components/UserContext';
import { Box, Card, CardContent, Typography, Avatar, Grid, TextField, Button, IconButton, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import StarIcon from '@mui/icons-material/Star';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FloatingActionMenu from './FloatingActionMenu';

const ClientDashboard = ({ onInitialsChange }) => {
  const { user, updateUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    middleName: user.middleName || "",
    email: user.email || "",
    carModel: user.carModel || "",
    carId: user.carId || "",
    carYear: user.carYear || "",
    details: user.details || "",
    nickname: user.nickname || "",
  });
  const [starredRides, setStarredRides] = useState([]);
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    const storedRides = localStorage.getItem('starredRides');
    if (storedRides) {
      setStarredRides(JSON.parse(storedRides));
    }
    const driverRequestStatus = localStorage.getItem("hasRequestedDriver");
    if (driverRequestStatus === "true") {
      setHasRequested(true);
    }
  }, []);

  useEffect(() => {
    if (onInitialsChange) {
      onInitialsChange(getProfileInitials());
    }
  }, [formValues.firstName, formValues.lastName]);

  const handleInputChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (field === "firstName" || field === "lastName") {
      updateUser({
        ...user,
        [field]: event.target.value,
      });
    }
  };

  const getProfileInitials = () => {
    const firstLetter = (formValues.firstName || '').charAt(0).toUpperCase();
    const lastLetter = (formValues.lastName || '').charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  };

  const handleConfirm = () => {
    setEditMode(false);
    setOpenSnackbar(true);
    updateUser({
      ...user,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      middleName: formValues.middleName,
      email: formValues.email,
      carModel: formValues.carModel,
      carId: formValues.carId,
      carYear: formValues.carYear,
      details: formValues.details,
      nickname: formValues.nickname,
    });
  };

  const handleRemoveStarred = (rideId) => {
    setStarredRides((prev) => {
      const updatedRides = prev.filter(ride => ride.id !== rideId);
      localStorage.setItem('starredRides', JSON.stringify(updatedRides));
      return updatedRides;
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDriverRequest = () => {
    if (!hasRequested) {
      // Mark the user as having requested to become a driver
      localStorage.setItem("hasRequestedDriver", "true");
      setHasRequested(true);
      // Optionally, you could show a success notification
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '120px' }}>
        <h1>Welcome to Your Account</h1>
        <Card sx={{ display: 'flex', width: '80%', padding: 3, borderRadius: 4, boxShadow: 16 }}>
          <Box sx={{ width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 13 }}>
            <Avatar sx={{ width: 100, height: 100, bgcolor: '#14653c', fontSize: '2rem' }}>
              {getProfileInitials()}
            </Avatar>
            {editMode ? (
              <TextField
                label="Nickname"
                value={formValues.nickname || ''}
                onChange={handleInputChange('nickname')}
                sx={{ marginTop: 2 }}
                fullWidth
              />
            ) : (
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                {formValues.nickname || 'nickname_john'}
              </Typography>
            )}
          </Box>
          <CardContent sx={{ width: '70%' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="First Name"
                  value={formValues.firstName}
                  onChange={handleInputChange('firstName')}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Last Name"
                  value={formValues.lastName}
                  onChange={handleInputChange('lastName')}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Middle Name/Initial"
                  value={formValues.middleName}
                  onChange={handleInputChange('middleName')}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid size={9.68} sx={{ marginBottom: '4px' }}>
                <TextField
                  label="Email"
                  value={formValues.email}
                  onChange={handleInputChange('email')}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 1 }}>
              <Grid item xs={4}>
                <TextField
                  label="Car Model"
                  value={formValues.carModel}
                  onChange={handleInputChange('carModel')}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Car Matriculation"
                  value={formValues.carId}
                  onChange={handleInputChange('carId')}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Car Year"
                  value={formValues.carYear}
                  onChange={handleInputChange('carYear')}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid size={9.68}>
                <TextField
                  label="Driver and Car Details"
                  value={formValues.details}
                  onChange={handleInputChange('details')}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={!editMode}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: -1 }}>
              {editMode ? (
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleConfirm}
                  sx={{ backgroundColor: '#14653c' }}
                >
                  Confirm
                </Button>
              ) : (
                <IconButton onClick={() => setEditMode(true)}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: '80%', marginTop: 3 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleDriverRequest}
            disabled={hasRequested}
            sx={{ width: '100%', height: '50px', borderRadius: '1rem', backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2c6d2f' } }}
          >
            {hasRequested ? 'Request Sent' : 'Request to Become a Driver'}
          </Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={hasRequested ? "Your request to become a driver has been sent!" : "Changes saved successfully"}
        />
        <Card sx={{ width: '80%', marginTop: 20, marginBottom: 20, padding: 3, boxShadow: 16, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, fontWeight: 'bold', color: '#14653c' }}>
            Starred Rides <StarIcon sx={{ color: '#fbc02d', marginLeft: 1 }} />
          </Typography>
          <Box sx={{ maxHeight: 350, overflowY: 'auto', backgroundColor: 'transparent', pr: 1 }}>
            <Grid container direction="column" spacing={2}>
              {starredRides.map((ride) => (
                <Grid item key={ride.id}>
                  <Card
                    sx={{
                      padding: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#fafafa',
                      borderRadius: 3,
                      marginBottom: '10px'
                    }}
                    elevation={4}
                  >
                    <Box>
                      <Typography variant="body1"><strong>City:</strong> {ride.city}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Driver:</strong> {ride.driver || 'N/A'}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Car:</strong> {ride.car}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Date:</strong> {ride.date} – {ride.hour}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Price:</strong> {ride.price ? `${ride.price} MAD` : 'N/A'}</Typography>
                    </Box>
                    <IconButton onClick={() => handleRemoveStarred(ride.id)}>
                      <RemoveCircleOutlineIcon sx={{ color: '#e53935' }} />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
        <Card sx={{ width: '80%', marginBottom: 20, padding: 3, boxShadow: 16, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, fontWeight: 'bold', color: '#14653c' }}>
            Liked Content <FavoriteIcon sx={{ color: '#e53935', marginLeft: 1 }} />
          </Typography>
          <Box sx={{ maxHeight: 350, overflowY: 'auto', backgroundColor: 'transparent', pr: 1 }}>
            <Grid container direction="column" spacing={2}>
              {(() => {
                const storedLikes = localStorage.getItem('likedItems');
                const likedItems = [
                  { id: 9991, type: 'ride', driver: 'Alice', city: 'Rabat' },
                  { id: 9992, type: 'review', user: 'Bob', content: 'Great ride!' },
                  { id: 9993, type: 'review', user: 'Charlie', content: 'Very comfortable and punctual.' },
                  ...(storedLikes ? JSON.parse(storedLikes) : [])
                ];
                return likedItems.map((item) => (
                  <Grid item key={item.id}>
                    <Card
                      sx={{
                        padding: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fafafa',
                        borderRadius: 3,
                        marginBottom: '10px'
                      }}
                      elevation={4}
                    >
                      <Box>
                        {item.type === 'ride' ? (
                          <>
                            <Typography variant="body1"><strong>City:</strong> {item.city}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>Driver:</strong> {item.driver || 'N/A'}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>Car:</strong> {item.car}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>Date:</strong> {item.date} – {item.hour}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>Price:</strong> {item.price ? `${item.price} MAD` : 'N/A'}</Typography>
                          </>
                        ) : (
                          <>
                            <Typography variant="body1"><strong>User:</strong> {item.user}</Typography>
                            <Typography variant="body2" color="text.secondary"><strong>Review:</strong> {item.content}</Typography>
                          </>
                        )}
                      </Box>
                      <IconButton>
                        <RemoveCircleOutlineIcon sx={{ color: '#e53935' }} />
                      </IconButton>
                    </Card>
                  </Grid>
                ));
              })()}
            </Grid>
          </Box>
        </Card>
        {/* --- New Reviews Card Below Liked Content --- */}
        <Card sx={{ width: '80%', marginBottom: 20, padding: 3, boxShadow: 16, borderRadius: 4 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, fontWeight: 'bold', color: '#14653c' }}>
            Your Reviews <TextSnippetIcon sx={{ color: '#1976d2', marginLeft: 1 }} />
          </Typography>
          <Box sx={{ maxHeight: 350, overflowY: 'auto', backgroundColor: 'transparent', pr: 1 }}>
            <Grid container direction="column" spacing={2}>
              {(() => {
                const storedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
                return storedReviews.map((review) => (
                  <Grid item key={review.id}>
                    <Card sx={{ padding: 2, backgroundColor: '#fafafa', borderRadius: 3, marginBottom: '10px' }} elevation={4}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{review.content}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Driver:</strong> {review.driver}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>City:</strong> {review.city}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Date:</strong> {review.date}</Typography>
                      <Typography variant="body2" color="text.secondary"><strong>Car:</strong> {review.carModel}</Typography>
                    </Card>
                  </Grid>
                ));
              })()}
            </Grid>
          </Box>
        </Card>
      </Box>
      <FloatingActionMenu />
    </>
  );
};

export default ClientDashboard;