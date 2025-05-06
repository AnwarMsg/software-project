import useRides from '../Hooks/useRides';
import RideCard from './RideCard';

const UpcomingRides = ({ driverId }) => {
  const { rides, loading } = useRides(driverId);

  if (loading) return <p>Loading...</p>;
  if (!rides.length) return <p>No upcoming rides.</p>;

  return (
    <div className="space-y-4">
      {rides.map(ride => <RideCard key={ride.id} ride={ride} />)}
    </div>
  );
};

export default UpcomingRides;
