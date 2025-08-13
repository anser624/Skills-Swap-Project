import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../ReduxStore/features/userSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = async () => {
    await axios.post("https://my-server-hazel.vercel.app/auth/logout", {}, { withCredentials: true });
    console.log("logout hogya Ustad !");
    localStorage.removeItem("userInfo");
    dispatch(remove());
    navigate("/login");
    // setIsAuthenticated(false); // 👈 Add this line
  };

  const user = useSelector((state) => state.userSlice.user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 mb-40 text-white shadow-md w-full top-0 fixed z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold tracking-wide">
            Skills<span className="text-yellow-400">Swap</span>
          </Link>

          {/* Hamburger for small screens */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Main Menu */}
          <div className="hidden md:flex gap-6 items-center text-lg font-semibold">
            {user?.email ? (
              <>
                <div className="flex items-center gap-2 group">
                  <Link to='/profile' className="capitalize font-semibold group-hover:text-yellow-300">
                    {user.name}
                  </Link>
                  <div className="w-7 h-7 bg-yellow-400 text-blue-900 font-bold rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Link to="/profile">{user.name[0]}</Link>
                  </div>
                </div>

                <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
                <Link to="/about" className="hover:text-yellow-300 transition">About</Link>

                <button
                  onClick={handleLogOut}
                  className="bg-red-500 px-4 py-1 rounded-md text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
                <Link to="/signup" className="hover:text-yellow-300 transition">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-800 px-6 pb-4 pt-2 space-y-3">
          {user?.email ? (
            <>
              <Link to="/profile" className="block hover:text-yellow-300" onClick={toggleMenu}>
                Profile ({user.name})
              </Link>
              <Link to="/homepage" className="block hover:text-yellow-300" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/about" className="block hover:text-yellow-300" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/skillForm" className="block hover:text-yellow-300" onClick={toggleMenu}>
                Add Skills
              </Link>
              <button
                onClick={() => {
                  handleLogOut();
                  toggleMenu();
                }}
                className="w-full text-left text-red-400 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-yellow-300" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/signup" className="block hover:text-yellow-300" onClick={toggleMenu}>
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
