import { useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

export default function SOS() {

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const { user } = useAuth();

  function handleGetLocation() {

    setLoading(true);

    if (!navigator.geolocation) {

      alert("Geolocation is not supported in this browser.");

      setLoading(false);

      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Save location locally
          setLocation({
            latitude,
            longitude,
          });

          // Firestore reference
          const alertsRef = collection(
            db,
            "users",
            user.uid,
            "sosAlerts"
          );

          // Save SOS alert
          await addDoc(alertsRef, {
            latitude,
            longitude,
            createdAt: serverTimestamp(),
            status: "active",
          });

          setAlertSent(true);

        } catch (error) {

          console.error(error);

          alert("Failed to activate SOS alert.");
        }

        setLoading(false);
      },

      (error) => {

        console.error(error);

        alert("Unable to fetch location.");

        setLoading(false);
      }

    );
  }

  return (
    <div className="min-h-screen pb-24 bg-pink-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Emergency SOS
        </h1>

        <p className="text-gray-500 mb-8">
          Tap the button below to activate emergency assistance.
        </p>

        <button
          onClick={handleGetLocation}
          className="w-40 h-40 rounded-full bg-red-600 hover:bg-red-700 text-white text-2xl font-bold shadow-2xl transition"
        >
          {loading ? "Loading..." : "SOS"}
        </button>

        {/* Location Card */}
        {location && (

          <div className="mt-8 text-left bg-pink-50 rounded-2xl p-4 border border-pink-100">

            <p className="text-sm text-gray-600 mb-2">
              Live Location
            </p>

            <p className="text-sm">
              <strong>Latitude:</strong> {location.latitude}
            </p>

            <p className="text-sm mb-4">
              <strong>Longitude:</strong> {location.longitude}
            </p>

            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-pink-600 hover:bg-pink-700 text-white text-center py-2 rounded-xl transition"
            >
              Open in Google Maps
            </a>

          </div>

        )}

        {/* Success Alert */}
        {alertSent && (

          <div className="mt-6 bg-red-100 border border-red-300 text-red-700 p-4 rounded-2xl">

            Emergency alert activated successfully.

          </div>

        )}

      </div>

    </div>
  );
}