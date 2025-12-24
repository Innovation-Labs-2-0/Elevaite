import { Link, NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import logo from "../assets/Logo.png";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  // const isAuthenticated = true; // Replace with actual authentication logic
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Left */}
          <div className="flex items-center gap-4">
            <img
              // src="https://storage.googleapis.com/gemini-prod/images/InnovAIte%40Jade-color-Logo-03.jpg"
              src ={logo}
              alt="InnovAIte Logo"
              className="h-15 w-auto"
            />
            <p
              id="current-datetime"
              className="font-semibold hidden lg:block text-xs text-gray-500"
            ></p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <nav className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base font-medium">
              {/* <NavLink to="/" className="nav-link">
                Home
              </NavLink> */}
              {/* <NavLink to="/my-hub" className="nav-link">
                My Hub
                </NavLink> */}
              {isAuthenticated && (
                <NavLink to="/ideathon" className="nav-link">
                  Ideathon
                </NavLink>
              )}
              {isAuthenticated && (
                <NavLink to="/pitch-wall" className="nav-link">
                  Pitch Wall
                </NavLink>
              )}
              {/* <NavLink to="/hackathon" className="nav-link">
                Hackathon
              </NavLink> */}
              {/* Admin link (toggle via role later) */}
              {/* <NavLink
                to="/admin"
                className="nav-link hidden"
                id="admin-nav-link"
              >
                Admin
              </NavLink> */}
            </nav>

            {!isAuthenticated && (
              <NavLink to="/" className="nav-link">
                Login
              </NavLink>
            )}
            {isAuthenticated && <UserMenu />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
