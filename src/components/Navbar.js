'use client'

import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login')
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link href="/" className="text-xl">
            Travel Planner
          </Link>
        </div>
        <div>
          <Link href="/add-itinerary" className="mr-4">
            Add Itinerary
          </Link>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
