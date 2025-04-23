import axios from 'axios';

export const fetchDriverRides = async (driverId) => {
  const res = await axios.get(`/api/rides?driverId=${driverId}`);
  return res.data;
};
