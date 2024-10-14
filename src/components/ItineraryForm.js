import { useState } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const ItineraryForm = ({ existingItinerary, onSuccess }) => {
  const [destination, setDestination] = useState(existingItinerary?.destination || '');
  const [activities, setActivities] = useState(existingItinerary?.activities || '');
  const [tripType, setTripType] = useState(existingItinerary?.tripType || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (existingItinerary) {
        // Update existing itinerary
        const itineraryRef = doc(db, 'itineraries', existingItinerary.id);
        await updateDoc(itineraryRef, {
          destination,
          activities,
          tripType,
        });
      } else {
        // Add new itinerary
        await addDoc(collection(db, 'itineraries'), {
          destination,
          activities,
          tripType,
          createdAt: new Date(),
        });
      }
      onSuccess(); // Call the onSuccess callback to refresh the list or redirect
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h1 className="text-xl mb-4">{existingItinerary ? 'Edit Itinerary' : 'Add Itinerary'}</h1>
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      />
      <input
        type="text"
        placeholder="Activities"
        value={activities}
        onChange={(e) => setActivities(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      />
      <input
        type="text"
        placeholder="Trip Type (Adventure, Leisure)"
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {existingItinerary ? 'Update Itinerary' : 'Add Itinerary'}
      </button>
    </form>
  );
};

export default ItineraryForm;
