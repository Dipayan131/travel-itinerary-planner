'use client';

import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import ItineraryCard from '../components/ItineraryCard';
import SearchBar from '../components/SearchBar';
import { get, ref } from 'firebase/database';
import Navbar from '@/components/Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [allItineraries, setAllItineraries] = useState([]); // Store all itineraries
  const router = useRouter();
  
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is authenticated, redirect to login page
        router.push('/login');
      } else {
        // User is authenticated, fetch itineraries
        const dbref = ref(db, 'itineraries');
        get(dbref)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const itinerariesArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
              }));
              setItineraries(itinerariesArray);
              setAllItineraries(itinerariesArray); // Store the full list
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
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <SearchBar itineraries={allItineraries} setItineraries={setItineraries} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {itineraries.map((itinerary, index) => (
            <ItineraryCard key={index} itinerary={itinerary} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
