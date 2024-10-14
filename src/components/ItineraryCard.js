import Link from 'next/link';

const ItineraryCard = ({ itinerary }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-200">
      <h2 className="text-xl font-bold mb-2 text-blue-600">{itinerary.destination}</h2>
      <p className="mb-2 text-gray-700">Activities: <span className="font-semibold">{itinerary.activities}</span></p>
      <p className="mb-4 text-gray-700">Trip Type: <span className="font-semibold">{itinerary.tripType}</span></p>
      <Link href={`/itinerary/${itinerary.id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 ease-in-out">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ItineraryCard;
