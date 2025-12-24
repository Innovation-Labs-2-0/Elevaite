import {
  LayoutDashboard,
  Search,
  Send,
  ClipboardCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function IdeathonTabs({ activeTab, onTabChange }) {

  const { user } = useAuth();

  return (
    <div
      id="ideathon-tabs"
      className="flex gap-2 border-b border-gray-200 mb-6"
    >
      <button
        className={`ideathon-tab-link ${
          activeTab === "overview" ? "active" : ""
        }`}
        onClick={() => onTabChange("overview")}
      >
        <LayoutDashboard size={16} />
        Overview
      </button>

      <button
        className={`ideathon-tab-link ${
          activeTab === "browse" ? "active" : ""
        }`}
        onClick={() => onTabChange("browse")}
      >
        <Search size={16} />
        Browse Ideas
      </button>

      <button
        className={`ideathon-tab-link ${
          activeTab === "submit" ? "active" : ""
        }`}
        onClick={() => onTabChange("submit")}
      >
        <Send size={16} />
        Submit Idea
      </button>

      {(user.role === "reviewer" || user.role === "admin") && (
        <button
          className={`ideathon-tab-link ${
            activeTab === "review" ? "active" : ""
          }`}
          onClick={() => onTabChange("review")}
        >
          <ClipboardCheck size={16} />
          Reviewer Hub
        </button>
      )}
    </div>
  );
}

export default IdeathonTabs;
