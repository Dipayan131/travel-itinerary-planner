'use client';

import { useState, useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../utils/firebase'; // Import Realtime Database instance
import Navbar from '@/components/Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const AddItineraryPage = () => {
  const [destination, setDestination] = useState('');
  const [activities, setActivities] = useState('');
  const [tripType, setTripType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login'); // Redirect to login if user is not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination || !activities || !tripType) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      // Generate a unique key for the new itinerary
      const newItineraryRef = ref(db, 'itineraries/' + Date.now());

      // Set the new itinerary with data
      await set(newItineraryRef, {
        destination,
        activities,
        tripType,
        createdAt: Date.now(), // Use Date.now() for a timestamp in Realtime Database
        isFavorite: false,
      });

      setSuccessMessage('Itinerary added successfully!');
      setErrorMessage('');
      setDestination('');
      setActivities('');
      setTripType('');
    } catch (error) {
      setErrorMessage('Error adding itinerary: ' + error.message);
      console.error('Error adding itinerary', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-blue-600">Add Itinerary</h1>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Activities"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Trip Type (Adventure, Leisure)"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Add Itinerary
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItineraryPage;
