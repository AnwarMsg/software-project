import { useState } from 'react';
import { offerRide } from '../Services/rideService';
import { useAuth } from '../Hooks/useAuth';

const OfferRideForm = () => {
  const { user } = useAuth();
  const [rideData, setRideData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    seats: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await offerRide({ ...rideData, driverId: user.id });
      alert('Ride offered successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to offer ride.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Offer a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="origin" placeholder="Origin" onChange={handleChange} className="input" required />
        <input name="destination" placeholder="Destination" onChange={handleChange} className="input" required />
        <input type="date" name="date" onChange={handleChange} className="input" required />
        <input type="time" name="time" onChange={handleChange} className="input" required />
        <input name="seats" type="number" placeholder="Seats Available" onChange={handleChange} className="input" required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default OfferRideForm;
