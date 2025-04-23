import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can call an API to update the profile on the backend
    setUser(formData);
    setEditMode(false);
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Email"
            type="email"
          />
          <input
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Phone Number"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'Not set'}</p>
          <button onClick={() => setEditMode(true)} className="mt-4 bg-gray-200 px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
