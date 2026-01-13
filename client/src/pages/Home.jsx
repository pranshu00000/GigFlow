import { useState, useEffect } from 'react';
import axios from 'axios';
import GigCard from '../components/GigCard';

const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGigs();
  }, [search]);

  const fetchGigs = async () => {
    try {
      const { data } = await axios.get(`/gigs?search=${search}`);
      setGigs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Find Your Next Gig</h1>
        <div className="w-1/3">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <p className="text-center text-gray-500">Loading gigs...</p>
      ) : gigs.length === 0 ? (
        <p className="text-center text-gray-500">No gigs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
