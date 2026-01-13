import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bids, setBids] = useState([]);
  
  // Bid Form State
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');
  const [bidError, setBidError] = useState(null);
  const [bidSuccess, setBidSuccess] = useState(null);

  useEffect(() => {
    fetchGig();
  }, [id]);

  useEffect(() => {
    if (gig && user && gig.owner._id === user._id) {
      fetchBids();
    }
  }, [gig, user]);

  const fetchGig = async () => {
    try {
      const { data } = await axios.get(`/gigs/${id}`);
      setGig(data);
    } catch (err) {
      setError('Gig not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const { data } = await axios.get(`/bids/${id}`);
      setBids(data);
    } catch (err) {
      console.error('Failed to fetch bids', err);
    }
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setBidError(null);
    setBidSuccess(null);
    try {
      await axios.post('/bids', { gigId: id, message, price: Number(price) });
      setBidSuccess('Bid placed successfully!');
      setMessage('');
      setPrice('');
    } catch (err) {
      setBidError(err.response?.data?.message || 'Failed to place bid');
    }
  };

  const handleHire = async (bidId) => {
    if (!window.confirm('Are you sure you want to hire this freelancer? This action cannot be undone.')) return;
    try {
      await axios.patch(`/bids/${bidId}/hire`);
      // Refresh data
      fetchGig();
      fetchBids();
      alert('Freelancer hired successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to hire freelancer');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!gig) return null;

  const isOwner = user && gig.owner && user._id === gig.owner._id;

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="bg-white p-8 rounded shadow-md mb-8 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{gig.title}</h1>
          <span className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wide ${gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {gig.status.toUpperCase()}
          </span>
        </div>
        <p className="text-gray-600 mb-6 whitespace-pre-line leading-relaxed">{gig.description}</p>
        <div className="flex items-center justify-between text-gray-500 border-t pt-4">
          <span>Budget: <span className="text-xl font-bold text-green-600">${gig.budget}</span></span>
          <span className="text-sm">Posted by: {gig.owner?.name}</span>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isOwner ? 'Proposals' : 'Submit a Proposal'}
        </h2>

        {isOwner ? (
          <div>
            {bids.length === 0 ? (
              <p className="text-gray-500 italic">No bids yet.</p>
            ) : (
              <div className="space-y-4">
                {bids.map((bid) => (
                  <div key={bid._id} className="bg-white p-4 rounded shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                         <span className="font-semibold text-lg">{bid.freelancerId.name}</span>
                         <span className="text-gray-500 text-sm ml-2">({bid.freelancerId.email})</span>
                       </div>
                       <div className="text-right">
                         <div className="text-xl font-bold text-blue-600">${bid.price}</div>
                         <div className={`text-sm font-medium ${
                           bid.status === 'hired' ? 'text-green-600' : 
                           bid.status === 'rejected' ? 'text-red-500' : 'text-yellow-600'
                         }`}>
                           {bid.status.toUpperCase()}
                         </div>
                       </div>
                    </div>
                    <p className="text-gray-700 mb-4">{bid.message}</p>
                    {gig.status === 'open' && bid.status === 'pending' && (
                      <button
                        onClick={() => handleHire(bid._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      >
                        Hire Freelancer
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {!user ? (
               <p>Please <Link to="/login" className="text-blue-600 underline">login</Link> to place a bid.</p>
            ) : gig.status !== 'open' ? (
               <p className="text-gray-500 italic">This gig is closed for new bids.</p>
            ) : (
              <form onSubmit={handleBidSubmit} className="bg-white p-6 rounded shadow-sm">
                {bidSuccess && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{bidSuccess}</div>}
                {bidError && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{bidError}</div>}
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Bid Amount ($)</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="1"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Proposal Message</label>
                  <textarea
                    className="w-full p-2 border rounded h-32"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Why are you the best fit for this job?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition font-semibold"
                >
                  Submit Proposal
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetails;
