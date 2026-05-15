import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            Welcome to Her Guardian
          </h1>

          <p className="text-gray-600 mb-6">
            Logged in as:
            <span className="font-semibold ml-2">
              {user?.email}
            </span>
          </p>

          <a
            href="/sos"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg mr-4"
          >
            Open SOS Module
          </a>

          <a
            href="/contacts"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg mr-4"
          >
            Trusted Contacts
          </a>
          <a
            href="/helpline"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mr-4 mt-4"
          >
            Emergency Helplines
          </a>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}