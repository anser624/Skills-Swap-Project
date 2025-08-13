// Login.jsx
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { info } from "../../ReduxStore/features/userSlice";
import { motion } from "framer-motion";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/signup",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      console.log(data);
      if (data.message === "Create User Successfully !") {
        alert("Signup Successfully!");
        dispatch(info(data.data));
        navigate("/profile");
      }
    } catch (error) {
      setLoading(false);
      alert("SignUp Failed " + error.code);
    }
  };

  const Loader = () => {
    return (
      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-sm mx-auto py-17 bg-white text-black  shadow-2xl rounded-2xl p-8 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Create Your Account
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Name !"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          required
        />
      </div>

      <motion.button
        type="submit"
        className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded transition ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
        disabled={loading}
        whileTap={{ scale: 0.97 }}
      >
        {loading ? (
          <>
            <Loader /> Submitting...
          </>
        ) : (
          "Submit"
        )}
      </motion.button>
    </form>
  );
}

export default SignUp;
