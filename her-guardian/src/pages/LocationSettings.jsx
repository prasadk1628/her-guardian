import { useState } from "react";

export default function LocationSettings() {

  const [location, setLocation] = useState(null);

  const [status, setStatus] = useState(
    "Location access not granted"
  );

  function handleGetLocation() {

    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setStatus("Location access enabled");
      },

      () => {
        setStatus("Location permission denied");
      }

    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6 pb-24">

      <div className="max-w-md mx-auto">

        <div className="bg-white rounded-3xl border border-pink-100 p-6">

          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            Location & GPS
          </h1>

          <p className="text-gray-500 mb-6">
            Manage emergency location access.
          </p>

          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 mb-6">

            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="font-semibold text-gray-800 mt-1">
              {status}
            </p>

          </div>

          {location && (

            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 mb-6">

              <p className="text-sm text-gray-500 mb-2">
                Current Coordinates
              </p>

              <p className="text-sm">
                Latitude: {location.latitude}
              </p>

              <p className="text-sm mt-1">
                Longitude: {location.longitude}
              </p>

            </div>

          )}

          <button
            onClick={handleGetLocation}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-2xl font-semibold transition"
          >
            Enable Location Access
          </button>

        </div>

      </div>

    </div>
  );
}