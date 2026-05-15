import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/sos", label: "SOS" },
    { path: "/contacts", label: "Contacts" },
    { path: "/helpline", label: "Helplines" },
  ];

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <nav className="bg-white shadow-md border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-600">
          Her Guardian
        </h1>

        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-pink-600 text-white"
                  : "text-gray-700 hover:bg-pink-100"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}