// pages/Register.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering user:", form);
    // Add axios call here later
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-80" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <InputField
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <InputField
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <InputField
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <Button text="Register" />

        <p className="text-sm mt-4 text-center">
          Already have an account? <Link to="/" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
