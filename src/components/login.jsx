import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onSwitch }) => {
  console.log("onClose prop:", onClose); // Debugging
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const auth = getAuth();
      console.log("Attempting to log in with:", email, password); // Debugging
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login successful! User:", user); // Debugging

      // Check if the logged-in user is the admin
      if (user.email === "hammadbuttyk2@gmail.com") {
        console.log("Admin detected. Redirecting to /admin"); // Debugging
        onClose(); // Close the login modal
        navigate("/admin"); // Redirect to the admin panel
      } else {
        alert("Login successful!");
        onClose(); // Close the modal for non-admin users
      }
    } catch (error) {
      console.error("Error logging in:", error); // Debugging
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md relative">
      <button
  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
  onClick={() => {
    console.log("Close button clicked"); // Debugging
    if (typeof onClose === "function") {
      onClose(); // Close the login modal
    } else {
      console.error("onClose is not a function", onClose);
    }
  }}
>
  ✖
</button>

        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={onSwitch}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;