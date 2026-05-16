import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

import { auth } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="min-h-screen pb-24 bg-pink-50 p-4">
      <div className="max-w-md mx-auto">

        {/* Greeting Card */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-3xl p-6 text-white shadow-xl mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Hello, {user?.displayName || "Guardian"} 👋
          </h1>

          <p className="text-pink-100 text-sm mb-4">
            Stay safe. Your guardian system is active.
          </p>

          <div className="bg-white/20 inline-flex items-center px-4 py-2 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
            Protection Active
          </div>
        </div>
        <div className="flex justify-center mb-10 mt-8">

          <Link
            to="/sos"
            className="w-44 h-44 rounded-full bg-pink-600 flex flex-col items-center justify-center text-white shadow-[0_0_80px_rgba(236,72,153,0.35)] hover:scale-105 transition"
          >
            <span className="text-5xl font-bold tracking-wide">
              SOS
            </span>

            <span className="text-sm mt-2 uppercase tracking-widest">
              Tap for Help
            </span>
          </Link>

        </div>

        {/* Quick Access */}
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4">
          Quick Access
        </h2>

        <div className="grid grid-cols-2 gap-4">


          <Link
            to="/contacts"
            className="bg-white rounded-2xl p-5 border border-pink-100 transition hover:border-pink-300"
          >
            <div className="text-3xl mb-3">👥</div>

            <h3 className="font-semibold text-gray-800">
              Contacts
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Trusted people
            </p>
          </Link>

          <Link
            to="/helpline"
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition"
          >
            <div className="text-3xl mb-3">📞</div>

            <h3 className="font-semibold text-gray-800">
              Helplines
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Emergency numbers
            </p>
          </Link>

          <Link
            to="/chat"
            className="bg-white rounded-2xl p-5 border border-pink-100 transition hover:border-pink-300"
          >
            <div className="text-3xl mb-3">💬</div>

            <h3 className="font-semibold text-gray-800">
              Support Chat
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Community room
            </p>
          </Link>

          <Link
            to="/sos"
            className="bg-white rounded-2xl p-5 border border-pink-100 transition hover:border-pink-300"
          >
            <div className="text-3xl mb-3">📍</div>
            
            <h3 className="font-semibold text-gray-800">
              Share Location
            </h3>
            
            <p className="text-sm text-gray-500 mt-1">
              Send to contacts
            </p>
          </Link>

        </div>
                {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">

            <div className="bg-white rounded-2xl p-4 border border-pink-100 flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-4"></div>

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  Location shared successfully
                </p>

                <p className="text-sm text-gray-500">
                  2 minutes ago
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-pink-100 flex items-center">
              <div className="w-3 h-3 rounded-full bg-pink-500 mr-4"></div>

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  SOS alert triggered
                </p>

                <p className="text-sm text-gray-500">
                  Yesterday
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-pink-100 flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-4"></div>

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  Trusted contact added
                </p>

                <p className="text-sm text-gray-500">
                  2 days ago
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}