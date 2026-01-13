import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGig = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/gigs', { title, description, budget });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create gig');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Post a New Gig</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Build a React Website"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe the project details..."
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Budget ($)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition font-semibold"
        >
          Post Gig
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
