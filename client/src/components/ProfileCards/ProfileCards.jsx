import { User, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ProfileCard = ({ name,city,onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          className="w-20 h-20 rounded-full  bg-slate-700 flex items-center justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <User className="w-10 h-10 text-gray-500" />
        </motion.div>

        {/* Info */}
        <h3 className="text-xl font-bold text-yellow-500 capitalize">{name}</h3>
        <p className="text-gray-600 text-md flex items-center mt-1">
          <MapPin className="w-4 h-4 mr-2" /> {city || "Not Added"}
        </p>

        {/* Button */}
        <motion.button
          // onClick={onSendRequest}
          className="mt-4 px-5 py-2 bg-green-500 text-white text-sm rounded-xl hover:bg-green-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Request
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
