import { Link } from 'react-router-dom';
import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in:", email, password);
    // Add axios call here later
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#F1F7F6]">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#2E4A3B]">Login</h2>
        
        <InputField
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4"
        />
        <InputField
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-6"
        />
        
        <Button text="Log In" className="w-full bg-[#34D399] text-white py-2 rounded-md" />

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-[#34D399] hover:text-[#2E4A3B]">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
