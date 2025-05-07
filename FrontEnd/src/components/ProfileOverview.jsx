const ProfileOverview = ({ user }) => (
    <div className="p-4 border rounded-xl shadow">
      <h3 className="font-bold mb-2">Profile</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> Driver</p>
    </div>
  );
  export default ProfileOverview;
  
