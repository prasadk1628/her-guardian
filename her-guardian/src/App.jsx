import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LocationSettings from "./pages/LocationSettings";
import Contacts from "./pages/Contacts";
import Helpline from "./pages/Helpline";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
  
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/helpline" element={<Helpline />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/location-settings"
          element={<LocationSettings />}
        />
  
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;