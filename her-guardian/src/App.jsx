import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SOS from "./pages/SOS";

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

  return <Dashboard />;
}

export default App;