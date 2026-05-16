import { useState } from "react";
import { useEffect } from "react";

import { signOut } from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { Link } from "react-router-dom";

import { auth, db } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [activities, setActivities] = useState([]);

  const [location, setLocation] = useState(null);

  const [sendingMessage, setSendingMessage] = useState(
    "Sending emergency alert..."
  );

  async function handleLogout() {
    await signOut(auth);
  }

  async function handleSOS() {

    setIsSOSActive(true);

    try {

      // Get location
      navigator.geolocation.getCurrentPosition(

        async (position) => {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLocation({
            latitude,
            longitude,
          });

          // Fetch trusted contacts
          const contactsRef = collection(
            db,
            "users",
            user.uid,
            "contacts"
          );

          const contactsSnap = await getDocs(
            contactsRef
          );

          const fetchedContacts =
            contactsSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

          setContacts(fetchedContacts);

          // Save SOS alert
          const alertsRef = collection(
            db,
            "users",
            user.uid,
            "sosAlerts"
          );

          await addDoc(alertsRef, {
            latitude,
            longitude,
            trustedContacts: fetchedContacts.length,
            createdAt: serverTimestamp(),
            status: "active",
          });

          setSendingMessage(
            `Emergency alert sent to ${fetchedContacts.length} trusted contacts`
          );
        },

        () => {

          setSendingMessage(
            "Failed to access location."
          );
        }

      );

    } catch (error) {

      console.error(error);

      setSendingMessage(
        "Emergency activation failed."
      );
    }
  }

  useEffect(() => {
    
    if (!user) return;
    
    const alertsRef = collection(
      db,
      "users",
      user.uid,
      "sosAlerts"
    );
  
    const q = query(
      alertsRef,
      orderBy("createdAt", "desc"),
      limit(5)
    );
  
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
      
        const fetchedActivities =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        
        setActivities(fetchedActivities);
      }
    );
  
    return () => unsubscribe();
  
  }, [user]);

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

          <button
            onClick={handleSOS}
            className="w-44 h-44 rounded-full bg-pink-600 flex flex-col items-center justify-center text-white shadow-[0_0_80px_rgba(236,72,153,0.35)] hover:scale-105 transition"
          >
            <span className="text-5xl font-bold tracking-wide">
              SOS
            </span>

            <span className="text-sm mt-2 uppercase tracking-widest">
              Tap for Help
            </span>
          </button>

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

            {activities.length === 0 ? (
            
              <div className="bg-white rounded-2xl p-4 border border-pink-100">
              
                <p className="text-gray-500">
                  No recent activity yet.
                </p>
            
              </div>

            ) : (
            
              activities.map((activity) => (
              
                <div
                  key={activity.id}
                  className="bg-white rounded-2xl p-4 border border-pink-100 flex items-center"
                >
                
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-4"></div>
              
                  <div className="flex-1">

                    <p className="font-medium text-gray-800">
                      SOS alert triggered
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Status: {activity.status}
                    </p>

                    {activity.latitude && activity.longitude && (
                    
                      <p className="text-xs text-pink-500 mt-2">
                        📍 {activity.latitude.toFixed(3)},{" "}
                        {activity.longitude.toFixed(3)}
                      </p>

                    )}

                    {activity.createdAt?.seconds && (
                    
                      <p className="text-xs text-gray-400 mt-2">
                      
                        {new Date(
                          activity.createdAt.seconds * 1000
                        ).toLocaleString()}

                      </p>

                    )}
              

              
                  </div>
              
                </div>

              ))
            
            )}

          </div>
          
        </div>
      </div>

      {isSOSActive && (
            
        <div className="fixed inset-0 bg-pink-700/95 z-50 flex flex-col items-center justify-center text-white px-6 text-center">
        
          <div className="text-7xl mb-6">
            🚨
          </div>
            
          <h1 className="text-5xl font-bold mb-4">
            SOS ALERT SENT!
          </h1>
            
          <p className="text-xl text-pink-100 mb-8 max-w-sm">
            {sendingMessage}
          </p>
            

          {contacts.length > 0 && (
                    
            <div className="mb-8 space-y-2">
            
              {contacts.slice(0, 3).map((contact) => (
              
                <div
                  key={contact.id}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-2"
                >
                
                  Alerting {contact.name}
              
                </div>
          
              ))}
          
            </div>
          
          )}
          {location && (

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mb-8 text-sm">
            
              <p>
                Latitude: {location.latitude}
              </p>

              <p className="mt-1">
                Longitude: {location.longitude}
              </p>

            </div>

          )}
            
          <button
            onClick={() => setIsSOSActive(false)}
            className="border-2 border-white px-10 py-4 rounded-2xl text-xl font-semibold hover:bg-white hover:text-pink-700 transition"
          >
            Cancel SOS
          </button>
            
        </div>
      
      )}

    </div>
  );
}