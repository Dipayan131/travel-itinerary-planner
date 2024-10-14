'use client'

import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-xl font-bold hover:text-gray-200 transition-colors duration-200">
            Travel Planner
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/add-itinerary">
            <button className="bg-green-500 px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-colors duration-200">
              Add Itinerary
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 ml-4 rounded hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
