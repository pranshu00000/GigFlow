import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md hover:shadow-lg transition border border-gray-200">
      <h3 className="text-xl font-bold mb-2 text-gray-800">{gig.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{gig.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Budget: <span className="font-semibold text-green-600">${gig.budget}</span></span>
        <span>Posted by: {gig.owner?.name}</span>
      </div>
      <Link
        to={`/gigs/${gig._id}`}
        className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default GigCard;
