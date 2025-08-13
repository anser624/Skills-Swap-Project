import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa"; // ✏️ Edit icon
import { useEffect, useState } from "react";
import axios from "axios";
import { info } from "../../ReduxStore/features/userSlice";

const Profile = () => {
  const [editModal, setEditModal] = useState(false);
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [teach, setTeach] = useState([]);
  const [learn, setLearn] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);

  const handleUpdate = async (e) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(
        "http://localhost:3000/data/update",
        {
          // body for backend
          id: user?.id,
          city: city || user.city,       // Agar city empty hai to purani value use karo
          gender: gender || user.gender, // Agar gender empty hai to purani value use karo
          learn: learn.length > 0 ? learn : user.learn,
          teach: teach.length > 0 ? teach : user.teach
        },
        {
          withCredentials: true,
        }
      );
      const data = await res.data;

      // console.log(data);

      dispatch(info(data.data));
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      console.log("Updated ! " + data.data);
      setEditModal(false);
    } catch (error) {
      console.log("Error he " + error.message);
    }
    setLoading(false);
  };

  const handleEditClick = () => {
    setCity(user.city || "");
    setGender(user.gender || "");
    setTeach(user.teach?.join(", ") || "");  // array → string
    setLearn(user.learn?.join(", ") || "");
    setEditModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen pt-40 bg-gradient-to-br from-slate-800 to-slate-950 text-white flex flex-col justify-center items-center px-6 py-16 font-sans"
    >
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 animate-pulse">
          Welcome Back!
        </h1>
        {user?.email && (
          <p className="text-xl text-gray-300 font-mono">
            Logged in as:{" "}
            <span className="text-yellow-400 uppercase">{user.name}</span>
          </p>
        )}
      </motion.div>

      {/* Profile Details Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.1, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-10 w-full max-w-3xl"
      >
        <div className="flex w-full justify-between">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-6 underline underline-offset-4">
            Profile Info
          </h2>
          <motion.button
            onClick={handleEditClick}
            whileHover={{ scale: 1.1, rotate: 1, transitionDuration: 0.3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1, type: "", stiffness: 900 }} // 👈 animation speed control
            className="flex items-center gap-2 px-4 py-1  text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaEdit className="text-lg" />
            Edit
          </motion.button>
        </div>
        {editModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-6 rounded-lg w-[90%] max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <form onSubmit={handleUpdate}>
                {/* Gender Field */}
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mb-3 w-full border p-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                {/* City Field */}
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mb-3 w-full border p-2"
                />

                {/* Teach Skills */}
                <input
                  type="text"
                  placeholder="Teach Skills (comma separated)"
                  value={teach}
                  onChange={(e) => setTeach(e.target.value)}
                  className="mb-3 w-full border p-2"
                />

                {/* Learn Skills */}
                <input
                  type="text"
                  placeholder="Learn Skills (comma separated)"
                  value={learn}
                  onChange={(e) => setLearn(e.target.value)}
                  className="mb-3 w-full border p-2"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditModal(false)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-1 rounded-md"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ul className="space-y-6 text-2xl capitalize text-gray-200 font-light">
          <li>
            <span className="font-semibold text-white">Name:</span> {user?.name}
          </li>
          <li>
            <span className="font-semibold text-white">City:</span> {user?.city}
          </li>
          <li>
            <span className="font-semibold text-white">Gender:</span>{" "}
            {user?.gender}
          </li>

          <li className="flex gap-2 flex-wrap">
            <span className="font-semibold  text-white">Skills to Teach:</span>
            {user?.teach?.length > 0 ? (
              user.teach.map((skill, i) => (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={i}
                  className="bg-yellow-500 flex gap-5  text-slate-900 px-5  py-1 rounded-full text-base font-medium shadow-md hover:bg-yellow-400 transition"
                >
                  <p>{skill}</p>
                </motion.span>
              ))
            ) : (
              <span className="text-gray-400 italic">Not added</span>
            )}
          </li>

          <li className="flex gap-2 flex-wrap">
            <span className="font-semibold text-white">Skills to Learn:</span>
            {user?.learn?.length > 0 ? (
              user.learn.map((skill, i) => (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={i}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-base font-medium shadow-md hover:bg-blue-400 transition"
                >
                  {skill}
                </motion.span>
              ))
            ) : (
              <span className="text-gray-400 italic">Not added</span>
            )}
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
