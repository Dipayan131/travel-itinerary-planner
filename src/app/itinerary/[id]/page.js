'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import Image from 'next/image';
import { get, ref } from 'firebase/database';
import Navbar from '@/components/Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const ItineraryPage = ({ params }) => {
  const [itinerary, setItinerary] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is authenticated, redirect to login page
        router.push('/login');
      } else {
        // User is authenticated, fetch itinerary data
        const dbref = ref(db, 'itineraries');
        get(dbref)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              setItinerary(data[params.id]); // Access the itinerary using the params.id
            } else {
              console.log('No itineraries found.');
            }
          })
          .catch((error) => {
            console.error('Error fetching itineraries:', error);
          });
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [router, params.id]);

  if (!itinerary) {
    return <div className="p-8 text-center text-red-500">Itinerary not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">{itinerary.destination}</h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Trip Type:</span> {itinerary.tripType}
        </p>
        <p className="text-gray-700 mb-6">
          <span className="font-semibold">Activities:</span> {itinerary.activities}
        </p>
        {/* Optional: Add an image if available */}
        {itinerary.imageUrl && (
          <Image
            src={itinerary.imageUrl}
            alt={`${itinerary.destination} itinerary`}
            width={600}
            height={400}
            className="rounded-md shadow-md mb-4"
          />
        )}
      </div>
    </>
  );
};

export default ItineraryPage;
