import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../ProfileCards/ProfileCards";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../ReduxStore/features/data";
import ProfileModal from "../ProfileModal/ProfileModal";

const AllUserPage = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();
    const {items} = useSelector((state) => state.data);
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://server-ruddy-nu.vercel.app/data/getAll", {
                withCredentials: true,
            });
            dispatch(setData(response.data.data));
            setUserData(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h2 className="text-5xl font-semibold text-center text-yellow-400 animate-pulse mb-18">All Users</h2>
            <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-slate-800 to-slate-700">

                {loading ? (
                    <div className="flex items-center justify-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {userData && userData.map((v) => (
                            <ProfileCard
                                key={v._id}
                                name={v.name}
                                email={v.email}
                                city={v.city}
                                onClick={() => setSelectedUser(v)}
                            //   onSendRequest={() => alert(`Request sent to ${v.name}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
            {selectedUser && (
                <ProfileModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </>
    );
};

export default AllUserPage;
