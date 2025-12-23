import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserMenu() {
  // const [user, setUser] = useState({ name: "User", role: "user" });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user, login, logout } = useAuth();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    logout();
    navigate("/");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <span className="w-8 h-8 rounded-full bg-[#1B5287] text-white flex items-center justify-center font-bold text-sm">
          {user.name.charAt(0)}
        </span>

        <span className="hidden md:block text-sm font-medium">
          {user.name}
        </span>

        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={()=> login({name: "User", role: "user"})}>
            User
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={()=> login({name: "Admin", role: "admin"})}>
            Admin
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={()=> login({name: "Reviewer", role: "reviewer"})}>
            Reviewer
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
