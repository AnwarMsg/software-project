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
    <div className="flex h-screen items-center justify-center bg-[#F1F7F6]">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleRegister}>
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#2E4A3B]">Create Account</h2>

        <InputField
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="mb-4"
        />
        <InputField
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4"
        />
        <InputField
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-6"
        />

        <Button text="Register" className="w-full bg-[#34D399] text-white py-2 rounded-md" />

        <p className="text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link to="/" className="text-[#34D399] hover:text-[#2E4A3B]">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
