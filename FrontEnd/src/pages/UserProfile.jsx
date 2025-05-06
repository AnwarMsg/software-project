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
    <div className="max-w-md mx-auto p-6 bg-[#F1F7F6] shadow-md rounded-xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#2E4A3B]">My Profile</h2>

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-[#34D399] rounded-md"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[#34D399] rounded-md"
            placeholder="Email"
            type="email"
          />
          <input
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="w-full p-3 border border-[#34D399] rounded-md"
            placeholder="Phone Number"
          />
          <button type="submit" className="w-full bg-[#34D399] text-white px-4 py-2 rounded-md">Save</button>
        </form>
      ) : (
        <div className="space-y-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'Not set'}</p>
          <button onClick={() => setEditMode(true)} className="mt-4 w-full bg-[#34D399] text-white px-4 py-2 rounded-md">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
