import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit } from "react-icons/fa"; // ✏️ Edit icon
import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { info } from "../../ReduxStore/features/userSlice";

const Profile = () => {
  const [editModal, setEditModal] = useState(false);
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [teach, setTeach] = useState([]);
  const [bio, setBio] = useState('');
  const [learn, setLearn] = useState([]);
  const [teachArray, setTeachArray] = useState([]);
  const [learnArray, setLearnArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleUpdate = async (e) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(
        "https://server-ruddy-nu.vercel.app/data/update",
        {
          // body for backend
          id: user?.id,
          city: city || user.city,       // Agar city empty hai to purani value use karo
          bio: bio || user.bio,       // Agar city empty hai to purani value use karo
          gender: gender || user.gender, // Agar gender empty hai to purani value use karo
          learn: learnArray.length > 0 ? learnArray : user.learn,
          teach: teachArray.length > 0 ? teachArray : user.teach
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
    setGender(user.bio || "");
    setTeach(user.teach?.join(", ") || "");  // array → string
    setLearn(user.learn?.join(", ") || "");
    setEditModal(true);
  };

  const handleTeachAdd = (e) => {
    e.preventDefault();
    if (teach.trim() !== "") {
      setTeachArray([teach, ...teachArray]);
    }
    setTeach(""); // Clear input
    console.log("Teach Array :", teachArray);
    console.log(teachArray);
  };

  const handleLearnAdd = (e) => {
    e.preventDefault();
    if (learn.trim() !== "") {
      setLearnArray([learn, ...learnArray]);
    }
    setLearn(""); // Clear input
    console.log("Learn Array :", learnArray);
    console.log(learnArray);
  };
  const removeTeachSkill = (index, e) => {
    e.preventDefault()
    setTeachArray((val) => val.filter((item, i) => i !== index));
  };
  const removeLearnSkill = (index, e) => {
    e.preventDefault()
    setLearnArray((val) => val.filter((item, i) => i !== index));
  };

  const Loader = () => {
    return (
      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );
  };

  useEffect(() => {
    console.log("Updated Teach Array:", teachArray);
    console.log("Updated Learn Array:", learnArray);
  }, [teachArray, learnArray]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen pt-28 sm:pt-36 bg-gradient-to-br from-slate-800 to-slate-950 text-white flex flex-col justify-center items-center px-4 sm:px-6 py-12 font-sans"
    >
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wide mb-3 animate-pulse">
          Welcome Back!
        </h1>
        {user?.email && (
          <p className="text-base sm:text-xl text-gray-300 font-mono break-words">
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
        whileHover={editModal ? {} : { scale: 1.01 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-3xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 underline underline-offset-4">
            Profile Info
          </h2>
          <motion.button
            onClick={handleEditClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <FaEdit className="text-lg" />
            Edit
          </motion.button>
        </div>

        {/* Modal */}
        {editModal && (
          <div className="fixed inset-0 bg-black/50 flex font-sans justify-center items-center z-50 px-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
              className="shadow-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-700 text-black p-5 rounded-xl w-full max-w-md sm:w-[80%] md:w-[60%]"
            >
              <h2 className="text-white text-center font-serif text-xl sm:text-2xl font-bold mb-4">
                Edit Profile
              </h2>
              {/* --- form content remains same --- */}
              {editModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1 }}
                    className="shadow-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-700 text-black dark:text-white p-5 rounded-xl w-full max-w-md sm:w-[80%] md:w-[60%]"
                  >
                    <h2 className="text-white text-center text-xl sm:text-2xl font-bold mb-4">
                      Edit Profile
                    </h2>

                    <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                      {/* Bio Section */}
                      <motion.div
                        className="flex flex-col sm:flex-row sm:items-end gap-3"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <div className="flex flex-col flex-1">
                          <label className="block font-semibold mb-1">
                            Tell About YourSelf
                          </label>
                          <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Your Name Is ?"
                            className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-800 rounded px-3 py-2"
                          />
                        </div>

                      </motion.div>
                      {/* Gender Field */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col"
                      >
                        <label className="block font-semibold mb-1">
                          Gender
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-800 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                          required
                        >
                          <option value="Other">Other</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </motion.div>

                      {/* City Field */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col"
                      >
                        <label className="block font-semibold mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Karachi, Lahore"
                          className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-800 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                          required
                        />
                      </motion.div>

                      {/* Teach Skill */}
                      <motion.div
                        className="flex flex-col sm:flex-row sm:items-end gap-3"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <div className="flex flex-col flex-1">
                          <label className="block font-semibold mb-1">
                            Skill you want to Teach
                          </label>
                          <input
                            type="text"
                            value={teach}
                            onChange={(e) => setTeach(e.target.value)}
                            placeholder="e.g. Canva, ReactJS"
                            className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-800 rounded px-3 py-2"
                          />
                        </div>
                        <motion.button
                          onClick={(e) => handleTeachAdd(e)}
                          type="button"
                          className={`flex justify-center items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded transition ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"}`}
                          disabled={loading}
                          whileTap={{ scale: 0.97 }}
                        >
                          {loading ? <> <Loader /> Adding... </> : "Add"}
                        </motion.button>
                      </motion.div>

                      {/* Learn Skill */}
                      <motion.div
                        className="flex flex-col sm:flex-row sm:items-end gap-3"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <div className="flex flex-col flex-1">
                          <label className="block font-semibold mb-1">
                            Skill you want to Learn
                          </label>
                          <input
                            type="text"
                            value={learn}
                            onChange={(e) => setLearn(e.target.value)}
                            placeholder="e.g. NodeJS, Digital Marketing"
                            className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-800 rounded px-3 py-2"
                          />
                        </div>
                        <motion.button
                          onClick={(e) => handleLearnAdd(e)}
                          type="button"
                          className={`flex justify-center items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded transition ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"}`}
                          disabled={loading}
                          whileTap={{ scale: 0.97 }}
                        >
                          {loading ? <> <Loader /> Adding... </> : "Add"}
                        </motion.button>
                      </motion.div>

                      {/* Skills Preview */}
                      <motion.div
                        className="bg-gradient-to-br from-blue-900 to-black text-white px-4 py-3 rounded-lg shadow-md space-y-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {/* Teach */}
                        <div>
                          <h1 className="font-bold text-lg mb-2">Teach Skills:</h1>
                          <div className="flex flex-wrap gap-2">
                            <AnimatePresence>
                              {teachArray.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  className="flex items-center gap-2 bg-blue-700 px-3 py-1 rounded-full text-sm"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7 }}
                                >
                                  {skill}
                                  <button
                                    onClick={(e) => removeTeachSkill(index, e)}
                                    className="text-white hover:text-red-300"
                                  >
                                    <X size={16} />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Learn */}
                        <div>
                          <h1 className="font-bold text-lg mb-2">Learn Skills:</h1>
                          <div className="flex flex-wrap gap-2">
                            <AnimatePresence>
                              {learnArray.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  className="flex items-center gap-2 bg-green-700 px-3 py-1 rounded-full text-sm"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7 }}
                                >
                                  {skill}
                                  <button
                                    onClick={(e) => removeLearnSkill(index, e)}
                                    className="text-white hover:text-red-300"
                                  >
                                    <X size={16} />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>

                      {/* Buttons */}
                      <div className="flex justify-end gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setEditModal(false)}
                          className="text-black dark:text-white border border-gray-300 px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                          {loading ? (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Profile Data */}
        <ul className="space-y-4 sm:space-y-6 text-lg sm:text-2xl capitalize text-gray-200 font-light">
          <li>
            <span className="font-semibold text-white">Name : </span> {user?.name}
          </li>
          <li>
            <span className="font-semibold text-white">Bio : </span> {user?.bio ? user.bio : <span className="text-gray-400 italic">Not added</span>}
          </li>
          <li>
            <span className="font-semibold text-white">City : </span> {user?.city ? user.city : <span className="text-gray-400 italic">Not added</span>}
          </li>
          <li>
            <span className="font-semibold text-white">Gender : </span> {user?.gender ? user.gender : <span className="text-gray-400 italic">Not added</span>}
          </li>

          {/* Teach Skills */}
          <li className="flex flex-col gap-2">
            <span className="font-semibold text-white">Skills to Teach : </span>
            <div className="flex flex-wrap gap-2">
              {user?.teach?.length > 0 ? (
                user.teach.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-yellow-400 transition"
                  >
                    {skill}
                  </motion.span>
                ))
              ) : (
                <span className="text-gray-400 italic">Not added</span>
              )}
            </div>
          </li>

          {/* Learn Skills */}
          <li className="flex flex-col gap-2">
            <span className="font-semibold text-white">Skills to Learn : </span>
            <div className="flex flex-wrap gap-2">
              {user?.learn?.length > 0 ? (
                user.learn.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-blue-400 transition"
                  >
                    {skill}
                  </motion.span>
                ))
              ) : (
                <span className="text-gray-400 italic">Not added</span>
              )}
            </div>
          </li>
        </ul>
      </motion.div>
    </motion.div>

  );
};

export default Profile;

{/* <div className="fixed inset-50 bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.50, 1, 0.13, 1] }}
              className="space-x-6 shadow-md  max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-700 text-black p-6 rounded-lg w-[90%] max-w-md">
              <h2 className="text-white text-center text-2xl font-bold mb-4">Edit Profile</h2>

              <form onSubmit={handleUpdate}>
                <div className="flex flex-col gap-5">
                  {/* Gender Field */}
// <motion.div
//   initial={{ opacity: 0, x: 30 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.5, ease: "easeOut" }}
//   className="flex flex-col flex-1">
//   <label className="block font-semibold mb-1 text-gray-700 dark:text-white">
//     Gender
//   </label>
//   <select
//     value={gender}
//     onChange={(e) => setGender(e.target.value)}
//     className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//     required
//   >
//     <option value="Other">Other</option>
//     <option value="Male">Male</option>
//     <option value="Female">Female</option>
//   </select>
// </motion.div>

// {/* City Field */}
// <motion.div
//   initial={{ opacity: 0, x: 30 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.5, ease: "easeOut" }}
//   className="flex flex-col flex-1">
//   <label className="block font-semibold mb-1 text-gray-700 dark:text-white">
//     City
//   </label>
//   <input
//     type="text"
//     value={city}
//     onChange={(e) => setCity(e.target.value)}
//     placeholder="e.g. Karachi,Lahore"
//     className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//     required
//   />
// </motion.div>

// {/* Teach Skill */}
// <motion.div
//   className="flex justify-center gap-4 items-center"
//   initial={{ opacity: 0, x: -30 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.5, ease: "easeOut" }}
// >
//   <div className="flex flex-col flex-1">
//     <label className="block font-semibold mb-1 text-gray-700 dark:text-white">
//       Skill you want to Teach
//     </label>
//     <input
//       type="text"
//       value={teach}
//       onChange={(e) => setTeach(e.target.value)}
//       placeholder="e.g. Canva, ReactJS"
//       className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//     />
//   </div>
//   <motion.button
//     onClick={(e) => handleTeachAdd(e)}
//     type="submit"
//     className={`flex justify-center items-center mt-6 gap-2 bg-blue-600 text-white py-2 px-4 rounded transition ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
//       }`}
//     disabled={loading}
//     whileTap={{ scale: 0.97 }}
//   >
//     {loading ? (
//       <>
//         <Loader /> Adding...
//       </>
//     ) : (
//       "Add"
//     )}
//   </motion.button>
// </motion.div>

// {/* Learn Skill */}
// <motion.div
//   className="flex gap-4 items-center"
//   initial={{ opacity: 0, x: -30 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.5, ease: "easeOut" }}
// >
//   <div className="flex flex-col flex-1">
//     <label className="block font-semibold mb-1 text-gray-700 dark:text-white">
//       Skill you want to Learn
//     </label>
//     <input
//       type="text"
//       value={learn}
//       onChange={(e) => setLearn(e.target.value)}
//       placeholder="e.g. NodeJS, Digital Marketing"
//       className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//     />
//   </div>
//   <motion.button
//     onClick={(e) => handleLearnAdd(e)}
//     type="submit"
//     className={`flex justify-center items-center mt-6 gap-2 bg-blue-600 text-white py-2 px-4 rounded transition ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
//       }`}
//     disabled={loading}
//     whileTap={{ scale: 0.97 }}
//   >
//     {loading ? (
//       <>
//         <Loader /> Adding...
//       </>
//     ) : (
//       "Add"
//     )}
//   </motion.button>
// </motion.div>

// {/* Skills Preview Section */}
// <motion.div
//   className="bg-gradient-to-br from-blue-900 to-black text-white px-5 py-4 my-4 rounded-lg shadow-md"
//   initial={{ opacity: 0, x: -30 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.5, ease: "easeOut" }}
// >
//   {/* Teach Skills */}
//   <div className="mb-4">
//     <h1 className="font-bold text-lg mb-2">Teach Skills:</h1>
//     <div className="flex flex-wrap gap-2">
//       <AnimatePresence>
//         {teachArray.map((skill, index) => (
//           <motion.div
//             key={index}
//             className="flex items-center gap-2 bg-blue-700 px-3 py-1 rounded-full text-sm"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.7 }}
//           >
//             {skill}
//             <button
//               onClick={(e) => removeTeachSkill(index, e)}
//               className="text-white hover:text-red-300"
//             >
//               <X size={16} />
//             </button>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   </div>

//   {/* Learn Skills */}
//   <div>
//     <h1 className="font-bold text-lg mb-2">Learn Skills:</h1>
//     <div className="flex flex-wrap gap-2">
//       <AnimatePresence>
//         {learnArray.map((skill, index) => (
//           <motion.div
//             key={index}
//             className="flex items-center gap-2 bg-green-700 px-3 py-1 rounded-full text-sm"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.7 }}
//           >
//             {skill}
//             <button
//               onClick={(e) => removeLearnSkill(index,e)}
//               className="text-white hover:text-red-300"
//             >
//               <X size={16} />
//             </button>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   </div>
// </motion.div>

//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={() => setEditModal(false)}
//             className="text-black border-2 border-gray-300 rounded-lg px-3 bg-white"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-green-600 text-white px-4 py-1 rounded-md"
//           >
//             {loading ? (
//               <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               "Update"
//             )}
//           </button>
//         </div>
//       </div>
//     </form>
//   </motion.div>
// </div> */}