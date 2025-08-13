import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { info } from "../../ReduxStore/features/userSlice";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        "https://my-server-hazel.vercel.app/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const data = await res.data.data;
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (res.data.message === "Login Successfully Welcome !") {
        dispatch(info(data));
        navigate("/profile");
      }
    } catch (error) {
      if (error.response) {
        // alert(error.response.data)
        setError(error.response.data);
      } else {
        alert("Something Went Wrong");
        console.log("Error HE " + error.code);
      }
    }
    setLoading(false);
  };
const Loader = () => {
  return (
    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
};
  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto my-10 bg-white shadow-2xl rounded-2xl p-8 space-y-9"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Login to Your Account
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mt-1 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          required
        />
        {error === "User Not Found !" && (
          <p className="text-red-500 font-bold text-sm mt-3 mx-3">{error}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 text-black mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          required
        />
        {error === "Password Not Match !" && (
          <p className="text-red-500 font-bold text-sm mt-3 mx-3">{error}</p>
        )}
      </div>
      <p
        onClick={(e) => {
          e.preventDefault();
          navigate("/signup");
        }}
        className="cursor-pointer text-end font-medium text-slate-600 hover:text-black"
      >
        Signup here
      </p>
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

export default Login;
