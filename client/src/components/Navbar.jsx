import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">GigFlow</Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.name}</span>
              <Link to="/create-gig" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">
                Post a Gig
              </Link>
              <button onClick={logout} className="hover:text-gray-200">Logout</button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
