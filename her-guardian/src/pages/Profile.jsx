import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();

  const [bloodGroup, setBloodGroup] = useState(
    localStorage.getItem("bloodGroup") || ""
  );

  const [medicalNotes, setMedicalNotes] = useState(
    localStorage.getItem("medicalNotes") || ""
  );

  const [isEditing, setIsEditing] = useState(
    !localStorage.getItem("bloodGroup")
  );

  async function handleLogout() {
    await signOut(auth);
  }

  function handleSaveEmergencyInfo() {
    localStorage.setItem("bloodGroup", bloodGroup);
    localStorage.setItem("medicalNotes", medicalNotes);

    setIsEditing(false);
  }

  return (
    <div className="min-h-screen bg-pink-50 p-4 pb-24">

      <div className="max-w-md mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">

          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-pink-200"
          />

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.displayName}
          </h2>

          <p className="text-gray-500 mt-1">
            {user.email}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 mt-6">

          <h3 className="text-xl font-semibold text-pink-600 mb-4">
            Emergency Information
          </h3>

          {isEditing ? (

            <div className="space-y-4">
            
              <input
                type="text"
                placeholder="Blood Group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full border border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
          
              <textarea
                placeholder="Medical Notes"
                value={medicalNotes}
                onChange={(e) => setMedicalNotes(e.target.value)}
                rows={4}
                className="w-full border border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
          
              <button
                onClick={handleSaveEmergencyInfo}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-2xl font-semibold transition"
              >
                Save Information
              </button>
                    
            </div>
          
          ) : (
          
            <div className="space-y-4">
            
              <div>
                <p className="text-sm text-gray-500">
                  Blood Group
                </p>
          
                <p className="font-semibold text-gray-800 mt-1">
                  {bloodGroup}
                </p>
              </div>
          
              <div>
                <p className="text-sm text-gray-500">
                  Medical Notes
                </p>
          
                <p className="font-semibold text-gray-800 mt-1">
                  {medicalNotes}
                </p>
              </div>
          
              <button
                onClick={() => setIsEditing(true)}
                className="w-full border border-pink-200 text-pink-600 py-3 rounded-2xl font-semibold transition hover:bg-pink-50"
              >
                Edit Information
              </button>
          
            </div>
          
          )}

        </div>

        {/* Trusted Contacts */}
        <div className="bg-white rounded-2xl shadow-md p-5 mt-6">

          <h3 className="text-xl font-semibold text-pink-600 mb-3">
            Trusted Contacts
          </h3>

          <p className="text-gray-500">
            No trusted contacts added yet.
          </p>

        </div>

        {/* Settings */}
        <div className="mt-8">

          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-4">
            Settings
          </h2>

          <div className="space-y-4">

            <button className="w-full bg-white rounded-2xl p-5 border border-pink-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🔔</span>

                <span className="font-medium text-gray-800">
                  Notification Preferences
                </span>
              </div>

              <span className="text-pink-400">›</span>
            </button>

            <button className="w-full bg-white rounded-2xl p-5 border border-pink-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">📍</span>

                <span className="font-medium text-gray-800">
                  <Link to="/location-settings">Location & GPS</Link>
                </span>
              </div>

              <span className="text-pink-400">›</span>
            </button>

            <button className="w-full bg-white rounded-2xl p-5 border border-pink-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🔒</span>

                <span className="font-medium text-gray-800">
                  Privacy & Security
                </span>
              </div>

              <span className="text-pink-400">›</span>
            </button>

            <button className="w-full bg-white rounded-2xl p-5 border border-pink-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">ℹ️</span>

                <span className="font-medium text-gray-800">
                  About Her Guardian
                </span>
              </div>

              <span className="text-pink-400">›</span>
            </button>

          </div>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-white rounded-2xl p-5 border border-pink-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🚪</span>
          
            <span className="font-medium text-red-500">
              Logout
            </span>
          </div>
          
          <span className="text-pink-400">›</span>
        </button>

      </div>

    </div>
  );
}