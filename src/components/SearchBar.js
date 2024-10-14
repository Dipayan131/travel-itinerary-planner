import { useState } from 'react';

const SearchBar = ({ itineraries, setItineraries }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setItineraries(itineraries); // Reset to full list if search term is empty
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter itineraries based on destination or activities matching the search term
    const filteredItineraries = itineraries.filter((itinerary) => {
      const destinationMatch = itinerary.destination.toLowerCase().includes(lowerCaseSearchTerm);
      const activitiesMatch = itinerary.activities.toLowerCase().includes(lowerCaseSearchTerm);
      return destinationMatch || activitiesMatch;
    });

    setItineraries(filteredItineraries);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by destination or activity"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
