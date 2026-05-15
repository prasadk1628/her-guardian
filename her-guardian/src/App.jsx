import { auth } from "./firebase/config";

function App() {
  console.log(auth);

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <h1 className="text-5xl font-bold text-pink-600">
        Firebase Connected ✅
      </h1>
    </div>
  );
}

export default App;