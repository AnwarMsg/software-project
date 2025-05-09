import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FilterPopup from '../components/FilterPopup.jsx';
import Header from '../components/Header.jsx';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HomeCards from '../components/HomeCards.jsx';
import Pagination from '@mui/material/Pagination';
import FloatingActionMenu from '../components/FloatingActionMenu.jsx';

function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [rides, setRides] = useState([
      {
        id: 3,
        city: 'Casablanca',
        driver: 'Mohamed',
        'driver-sex': 'male',
        car: 'BMW X5',
        price: '30',
        picture: 'https://picsum.photos/seed/car4/400/300',
        capacity: 4,
        booked: 2,
        availability: 2,
        date: '2025-04-22',
        hour: '14:00'
      },
      {
        id: 2,
        city: 'Marrakesh',
        driver: 'Rachid',
        'driver-sex': 'male',
        car: 'Audi A4',
        price: '45',
        picture: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80',
        capacity: 3,
        booked: 1,
        availability: 2,
        date: '2025-04-23',
        hour: '16:30'
      },
      {
        id: 1,
        city: 'Rabat',
        driver: 'Sara',
        'driver-sex': 'female',
        car: 'Toyota Corolla',
        price: '25',
        picture: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
        capacity: 4,
        booked: 0,
        availability: 4,
        date: '2025-04-24',
        hour: '12:15'
      },
      {
        id: 4,
        city: 'Fes',
        driver: 'Youssef',
        'driver-sex': 'male',
        car: 'Hyundai Elantra',
        price: '28',
        picture: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=400&q=80',
        capacity: 5,
        booked: 0,
        availability: 5,
        date: '2025-04-25',
        hour: '09:45'
      },
      ...Array(16).fill(null).map((_, index) => ({
        id: 5 + index,
        city: `City ${index + 1}`,
        driver: `Driver ${index + 1}`,
        'driver-sex': index % 2 === 0 ? 'male' : 'female',
        car: `Car ${index + 1}`,
        price: (25 + (index % 3) * 5).toString(),
        picture: `https://picsum.photos/seed/car${index}/400/300`,
        capacity: 4 + (index % 2),
        booked: Math.floor(Math.random() * 4),
        availability: 4 - Math.floor(Math.random() * 4),
        date: `2025-04-${22 + Math.floor(index / 5)}`,
        hour: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
      }))
    ]);
    const [userReviews, setUserReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
  
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState(null);
    const [confirmationPopup, setConfirmationPopup] = useState(null); // { type: 'book' | 'cancel', rideId }
    const [successPopup, setSuccessPopup] = useState(null); // { message: string }
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
      // Check if the user is logged in (authentication check)
      const authStatus = localStorage.getItem("isAuthenticated");
      if (authStatus === "true") {
        setIsAuthenticated(true);
      }
      const storedReviews = JSON.parse(localStorage.getItem("userReviews")) || [];
      setUserReviews(storedReviews);
    }, []);
  
    const handleApplyFilters = (filterData) => {
      setFilters(filterData);
      setShowFilters(false);
    };

    const handleResetFilters = () => {
      setFilters(null);
      setShowFilters(false);
    };
  
    const confirmBooking = (rideId) => {
      const updatedRides = rides.map(ride => {
        if (ride.id === rideId && ride.availability > 0) {
          const newBooked = ride.booked + 1;
          return {
            ...ride,
            booked: newBooked,
            availability: ride.capacity - newBooked,
            isBooked: true
          };
        }
        return ride;
      });
      setRides(updatedRides);
      setConfirmationPopup(null);
      setSuccessPopup({ message: 'Booking successful!' });
      setTimeout(() => setSuccessPopup(null), 3000);
    };
  
    const confirmCancellation = (rideId) => {
      const updatedRides = rides.map(ride => {
        if (ride.id === rideId && ride.isBooked) {
          const newBooked = Math.max(ride.booked - 1, 0);
          return {
            ...ride,
            booked: newBooked,
            availability: ride.capacity - newBooked,
            isBooked: false
          };
        }
        return ride;
      });
      setRides(updatedRides);
      setConfirmationPopup(null);
      setSuccessPopup({ message: 'Cancellation successful!' });
      setTimeout(() => setSuccessPopup(null), 3000);
    };
  
    const filteredRides = rides.filter((ride) => {
      const matchesCity = ride.city.toLowerCase().includes(search.toLowerCase());
  
      if (!filters) return matchesCity;
  
      const price = parseInt(ride.price);
      const min = parseInt(filters.minPrice) || 0;
      const max = parseInt(filters.maxPrice) || Infinity;
  
      return (
        matchesCity &&
        price >= min &&
        price <= max &&
        (filters.date ? ride.date === filters.date : true) &&
        (filters.hour ? ride.hour === filters.hour : true) &&
        (filters.sex ? ride["driver-sex"] === filters.sex : true)
      );
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRides = filteredRides.slice(startIndex, startIndex + itemsPerPage);

    const handleReviewSubmit = () => {
      if (newReview.trim()) {
        const updatedReviews = [...userReviews, { text: newReview, date: new Date().toLocaleString() }];
        setUserReviews(updatedReviews);
        localStorage.setItem("userReviews", JSON.stringify(updatedReviews)); // Saving to localStorage
        setNewReview('');
      }
    };
  
    return (
    <div>
      <Header />
      <div className="main-content">
        <h1>Welcome to DriveMe</h1>
        <div className="search-and-filter">
        <div className="search-bar-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search for rides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant='contained' style={{backgroundColor: '#14653c', borderRadius: '1.5rem', height: '2.7rem'}}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filter
          </Button>
        </div>
        {showFilters && (
          <FilterPopup
            show={showFilters}
            onClose={() => setShowFilters(false)}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />
        )}
        </div>
        <Grid container spacing={6} justifyContent="center" style={{ padding: '0 100px' }}>
          {currentRides.map(ride => (
            <Grid size={4} style={{marginBottom: '40px' }} key={ride.id}>
              <HomeCards
                ride={ride}
                onBookCancel={(rideObj) => {
                  if (!isAuthenticated) {
                    setShowAuthPopup(true);
                    return;
                  }
                  if (rideObj.isBooked) {
                    setConfirmationPopup({ type: 'cancel', rideId: rideObj.id });
                  } else {
                    setConfirmationPopup({ type: 'book', rideId: rideObj.id });
                  }
                }}
                isAuthenticated={isAuthenticated}
                userReviews={userReviews}
                setUserReviews={setUserReviews}
              />
            </Grid>
          ))}
        </Grid>
        <Pagination color="standard"
          count={Math.ceil(filteredRides.length / itemsPerPage)}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
        />
        {confirmationPopup && (
          <div className="overlay">
            <div className="popup">
              {confirmationPopup.type === 'book' && rides.find(r => r.id === confirmationPopup.rideId)?.availability === 0 ? (
                <>
                  <p>
                    <strong>This ride is full.</strong><br />
                    No more seats are available for this ride.
                  </p>
                  <div className="popup-actions">
                    <button onClick={() => setConfirmationPopup(null)}>Close</button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Are you sure you want to {confirmationPopup.type === 'book' ? 'book this ride?' : 'cancel your booking?'}
                  </p>
                  <div className="popup-actions">
                    <button
                      onClick={() =>
                        confirmationPopup.type === 'book'
                          ? confirmBooking(confirmationPopup.rideId)
                          : confirmCancellation(confirmationPopup.rideId)
                      }
                    >
                      Yes
                    </button>
                    <button onClick={() => setConfirmationPopup(null)}>No</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
  
        {successPopup && (
          <div className="success-popup">
            {successPopup.message}
          </div>
        )}
  
        {showAuthPopup && (
          <div className="overlay">
            <div className="popup">
              <p>You must be signed in to book a ride.</p>
              <div className="popup-actions">
                <button onClick={() => navigate('/login')}>Go to Sign In</button>
                <button onClick={() => setShowAuthPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
      <FloatingActionMenu/>
      </div>
    );
  }
  
  export default Home;