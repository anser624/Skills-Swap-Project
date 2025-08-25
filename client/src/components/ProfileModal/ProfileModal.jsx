import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ProfileModal = ({ user, onClose }) => {
    return (
        <AnimatePresence>
            {user && (
                <motion.div
                    className="fixed flex-col inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl capitalize p-8 w-full max-w-lg mx-4 relative"
                        initial={{ scale: 0.8, opacity: 0, y: -150 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -150 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        onClick={(e) => e.stopPropagation()} // taake background click close ho
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-6 cursor-pointer text-gray-500 hover:text-red-500 text-2xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-3xl font-bold mb-4 text-center text-yellow-500">
                            {user.name}
                        </h2>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold ">Bio : </span> {user.bio ? user.bio : <span className="text-gray-400 italic">Not added</span>}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold ">Email : </span> {user.email ? user.email : <span className="text-gray-400 italic">Not added</span>}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">City : </span> {user.city ? user.city : <span className="text-gray-400 italic">Not added</span>}
                        </p>

                        {/* Teach & Learn arrays (fix wala) */}
                        <div className="mt-4 space-y-3">
                            <div>
                                <h3 className="font-semibold text-blue-600">Teaches : </h3>
                                {user.teach && user.teach.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {user.teach.map((item, i) => (
                                            <li className="text-black font-semibold" key={i}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">Not Added</p>
                                )}
                            </div>

                            <div>
                                <h3 className="font-semibold text-green-600">Wants to Learn : </h3>
                                {user.learn && user.learn.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {user.learn.map((item, i) => (
                                            <li className="text-black font-semibold " key={i}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">Not Added</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                    {/* Button */}
                    <motion.button
                        // onClick={onSendRequest}
                        className="mt-4 px-5 py-2 bg-green-500 text-white text-sm rounded-xl hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Request
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;
