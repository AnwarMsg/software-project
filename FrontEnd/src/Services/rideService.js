import axios from 'axios';

export const fetchDriverRides = async (driverId) => {
  const res = await axios.get(`/api/rides?driverId=${driverId}`);
  return res.data;
};

<<<<<<< HEAD
export const offerRide = async () => {

};
=======
export const offerRide = async() => { };
>>>>>>> 731aabb3827e0391f010ab48a02fbe81817c3a95
