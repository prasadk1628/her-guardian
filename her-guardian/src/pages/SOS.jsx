import { useState } from "react";

export default function SOS() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleGetLocation() {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

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
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Emergency SOS
        </h1>

        <p className="text-gray-500 mb-8">
          Tap the button below to fetch your live location.
        </p>

        <button
          onClick={handleGetLocation}
          className="w-40 h-40 rounded-full bg-red-600 hover:bg-red-700 text-white text-2xl font-bold shadow-2xl transition"
        >
          {loading ? "Loading..." : "SOS"}
        </button>

        {location && (
          <div className="mt-8 text-left bg-pink-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2">
              Live Location:
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
              className="block bg-pink-600 hover:bg-pink-700 text-white text-center py-2 rounded-lg"
            >
              Open in Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
}