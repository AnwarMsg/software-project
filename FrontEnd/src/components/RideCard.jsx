const RideCard = ({ ride }) => (
    <div className="p-4 border rounded-xl shadow-sm">
      <h4>{ride.destination} - {ride.date}</h4>
      <p>{ride.time} | Seats: {ride.seats}</p>
    </div>
  );
  export default RideCard;
  