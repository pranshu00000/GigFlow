import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateGig from './pages/CreateGig';
import GigDetails from './pages/GigDetails';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-gig" element={<CreateGig />} />
          <Route path="/gigs/:id" element={<GigDetails />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
