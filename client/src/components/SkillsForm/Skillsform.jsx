import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";
import { useSelector ,useDispatch} from "react-redux";
import { info } from "../../ReduxStore/features/userSlice";

const Skillsform = () => {
  // const [city, setCity] = useState("");
  // const [gender, setGender] = useState("");
  const [teach, setTeach] = useState("");
  const [learn, setLearn] = useState("");
  const [teachArray, setTeachArray] = useState([]);
  const [learnArray, setLearnArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector((state)=>(state.userSlice.user))


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(
        "http://localhost:3000/data/update",
        {
          // body for backend
          id:user.id,
          teach:teachArray,
          learn:learnArray,
          // city,
          // gender,
        },
        {
          withCredentials: true,
        }
      );
      const data = await res.data
      dispatch(info(data.data))
      console.log("Updated Jani ! "+ data.data);
      
      
    } catch (error) {
      console.log( "Error he jani"+error.message);
    }
    setLoading(false)
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

  const removeTeachSkill = (index) => {
    setTeachArray((val) => val.filter((item, i) => i !== index));
  };
  const removeLearnSkill = (index) => {
    setLearnArray((val) => val.filter((item, i) => i !== index));
  };

  useEffect(() => {
    console.log("Updated Teach Array:", teachArray);
    console.log("Updated Learn Array:", learnArray);
  }, [teachArray, learnArray]);

    const Loader = () => {
    return (
      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );
  };
  return (
    <motion.div
      className="max-w-lg mx-auto  p-6 rounded-lg space-x-6 shadow-md bg-white dark:bg-slate-900"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-white">
        Update Your Skills
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">       
        <div className="flex flex-col flex-1">
          <label className="block font-semibold mb-1 text-gray-700 dark:text-white">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Karachi,Lahore"
            className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="block font-semibold mb-1 text-gray-700 dark:text-white">
            Gender
          </label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="e.g. Male, Female"
            className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>
        {/* Teach Skill */}
        <motion.div
          className="flex justify-center gap-4 items-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col flex-1">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-white">
              Skill you want to Teach
            </label>
            <input
              type="text"
              value={teach}
              onChange={(e) => setTeach(e.target.value)}
              placeholder="e.g. Canva, ReactJS"
              className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <motion.button
            onClick={(e) => handleTeachAdd(e)}
            type="submit"
            className={`flex justify-center items-center mt-6 gap-2 bg-blue-600 text-white py-2 px-4 rounded transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? (
              <>
                <Loader /> Adding...
              </>
            ) : (
              "Add"
            )}
          </motion.button>
        </motion.div>

        {/* Learn Skill */}
        <motion.div
          className="flex gap-4 items-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col flex-1">
            <label className="block font-semibold mb-1 text-gray-700 dark:text-white">
              Skill you want to Learn
            </label>
            <input
              type="text"
              value={learn}
              onChange={(e) => setLearn(e.target.value)}
              placeholder="e.g. NodeJS, Digital Marketing"
              className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 text-black dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <motion.button
            onClick={(e) => handleLearnAdd(e)}
            type="submit"
            className={`flex justify-center items-center mt-6 gap-2 bg-blue-600 text-white py-2 px-4 rounded transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? (
              <>
                <Loader /> Adding...
              </>
            ) : (
              "Add"
            )}
          </motion.button>
        </motion.div>

        {/* Skills Preview Section */}
        <motion.div
          className="bg-gradient-to-br from-blue-900 to-black text-white px-5 py-4 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Teach Skills */}
          <div className="mb-4">
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
                      onClick={() => removeTeachSkill(index)}
                      className="text-white hover:text-red-300"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Learn Skills */}
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
                      onClick={() => removeLearnSkill(index)}
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
    </motion.div>
  );
};

export default Skillsform;
