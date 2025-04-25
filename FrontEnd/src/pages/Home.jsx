import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FilterPopup from '../components/FilterPopup.jsx';
import Header from '../components/Header.jsx';

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
        picture: 'https://images.unsplash.com/photo-1617780386600-ec45651d9f3c?auto=format&fit=crop&w=250&q=80',
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
        picture: 'https://images.unsplash.com/photo-1571607389282-4c9b3d2aab7e?auto=format&fit=crop&w=250&q=80',
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
        picture: 'https://images.unsplash.com/photo-1571607389282-4c9b3d2aab7e?auto=format&fit=crop&w=250&q=80',
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
        picture: 'https://images.unsplash.com/photo-1602330030409-7b41b352fa4e?auto=format&fit=crop&w=250&q=80',
        capacity: 5,
        booked: 0,
        availability: 5,
        date: '2025-04-25',
        hour: '09:45'
      }
    ]);
  
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState(null);
    const [confirmationPopup, setConfirmationPopup] = useState(null); // { type: 'book' | 'cancel', rideId }
    const [successPopup, setSuccessPopup] = useState(null); // { message: string }
  
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
      // Check if the user is logged in (authentication check)
      const authStatus = localStorage.getItem("isAuthenticated");
      if (authStatus === "true") {
        setIsAuthenticated(true);
      }
    }, []);
  
    const handleApplyFilters = (filterData) => {
      setFilters(filterData);
      setShowFilters(false);
    };
  
    const confirmBooking = (rideId) => {
      const updatedRides = rides.map(ride => {
        if (ride.id === rideId && ride.availability > 0) {
          return {
            ...ride,
            booked: ride.booked + 1,
            availability: ride.capacity - (ride.booked + 1),
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
  
    return (
    <div>
      <Header />
      <div className="main-content">
        <h1>Welcome to DriveMe</h1>
        <div className="search-bar-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search for rides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filter
          </button>
        </div>
        {showFilters && (
          <FilterPopup
            show={showFilters}
            onClose={() => setShowFilters(false)}
            onApply={handleApplyFilters}
          />
        )}
        <div className="posts-container">
          {filteredRides.map(ride => (
            <div className="post" key={ride.id}>
              <img src={ride.picture} alt={`${ride.car}`} className="post-image" />
              <h2>{ride.city}</h2>
              <p className="time">Time: {ride.date} {ride.hour}</p>
              <p className="driver">Driver: {ride.driver} ({ride["driver-sex"]})</p>
              <p className="car">Car: {ride.car}</p>
              <p className="capacity">Capacity: {ride.capacity}</p>
              <div className="status">
                <p>Status: {ride.availability === 0 ? 'Full' : 'Open'}</p>
              </div>
              <div className="price">
                <p>{ride.price} MAD</p>
              </div>
              <div className="availability-and-book">
                <p className="availability">Left: {ride.availability}</p>
                <button
                  className={ride.isBooked ? "cancel-button" : "book-button"}
                  onClick={() => {
                    if (!isAuthenticated && !ride.isBooked) {
                      setShowAuthPopup(true);
                    } else {
                      setConfirmationPopup({
                        type: ride.isBooked ? 'cancel' : 'book',
                        rideId: ride.id
                      });
                    }
                  }}
                >
                  {ride.isBooked ? 'Cancel' : ride.availability === 0 ? 'Full' : 'Book'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {confirmationPopup && (
          <div className="overlay">
            <div className="popup">
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
                <button onClick={() => navigate('/auth')}>Go to Sign In</button>
                <button onClick={() => setShowAuthPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    );
  }
  
  export default Home;