import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Login() {
  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-3">
          Her Guardian
        </h1>

        <p className="text-gray-500 mb-8">
          Smart Women Safety & Emergency System
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}