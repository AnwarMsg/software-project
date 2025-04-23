import { useState, useEffect } from 'react';
import { fetchDriverRides } from '@/services/rideService';

const useRides = (driverId) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriverRides(driverId).then(data => {
      setRides(data);
      setLoading(false);
    });
  }, [driverId]);

  return { rides, loading };
};

export default useRides;
