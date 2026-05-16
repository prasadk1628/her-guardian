import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: "🏠",
    },
    {
      path: "/contacts",
      label: "Contacts",
      icon: "👥",
    },
    {
      path: "/helpline",
      label: "Help",
      icon: "📞",
    },
    {
      path: "/chat",
      label: "Chat",
      icon: "💬",
    },
    {
      path: "/profile",
      label: "Profile",
      icon: "👤",
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center py-2">

        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center text-xs transition ${
                active
                  ? "text-pink-600"
                  : "text-gray-400"
              }`}
            >
              <span className="text-2xl">
                {item.icon}
              </span>

              <span className="mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}

      </div>
    </div>
  );
}