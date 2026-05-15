import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SOS from "./pages/SOS";
import Contacts from "./pages/Contacts";
import Helpline from "./pages/Helpline";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  const path = window.location.pathname;

  if (!user) {
    return <Login />;
  }

  if (path === "/sos") {
    return <SOS />;
  }

  if (path === "/contacts") {
    return <Contacts />;
  }
  if (path === "/helpline") {
    return <Helpline />;
  }

  return <Dashboard />;
}

export default App;