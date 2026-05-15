import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SOS from "./pages/SOS";
import Contacts from "./pages/Contacts";
import Helpline from "./pages/Helpline";

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
        <Route path="/sos" element={<SOS />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/helpline" element={<Helpline />} />
  
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;