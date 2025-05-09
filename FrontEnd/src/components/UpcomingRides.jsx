import useRides from '../Hooks/useRides';
import RideCard from './RideCard';

const UpcomingRides = ({ driverId }) => {
  const { rides, loading } = useRides(driverId);

  if (loading) return <p>Loading your upcoming rides...</p>;
  if (!rides.length) return <p>You have no upcoming rides at the moment.</p>;

  return (
    <div className="space-y-4">
      {rides.map(ride => <RideCard key={ride.id} ride={ride} />)}
    </div>
  );
};

export default UpcomingRides;
