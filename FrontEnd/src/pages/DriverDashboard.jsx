import ProfileOverview from '../components/ProfileOverview';
import UpcomingRides from '../components/UpcomingRides';
import { useAuth } from '../Hooks/useAuth';

const DriverDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 grid md:grid-cols-3 gap-4">
      <section className="col-span-2">
        <h2 className="text-xl font-bold mb-4">My Rides</h2>
        <UpcomingRides driverId={user.id} />
      </section>
      <aside>
        <ProfileOverview user={user} />
      </aside>
    </div>
  );
};

export default DriverDashboard;
