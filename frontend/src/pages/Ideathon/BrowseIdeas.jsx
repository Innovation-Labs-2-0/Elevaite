import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import IdeaCard from "../../components/IdeaCard";
import { sampleIdeas } from "../../data/sampleIdeas";

const CURRENT_USER_ID = "user-1";

const SAMPLE_IDEAS = [
  {
    id: "1",
    ideaTitle: "AI Incident Prediction",
    fullName: "Amit Sharma",
    role: "Software Engineer",
    problemStatement:
      "Incidents are detected too late causing business disruption.",
    proposedSolution:
      "Use ML models to predict incidents based on logs and metrics.",
    benefits: "Reduced downtime and faster response",
    techStack: "Python, ML, Prometheus",
    upvotes: ["u1", "u2", "u3"],
    comments: [],
    status: "approved-hackathon",
    createdAt: "2025-09-10",
  },
  {
    id: "2",
    ideaTitle: "Smart Cost Optimizer",
    fullName: "Neha Verma",
    role: "Cloud Architect",
    problemStatement: "Cloud costs are increasing without visibility.",
    proposedSolution:
      "AI-based cost anomaly detection and optimization suggestions.",
    benefits: "Lower infra cost",
    techStack: "AWS, Lambda, AI",
    upvotes: ["u1"],
    comments: [],
    status: "under-review",
    createdAt: "2025-09-12",
  },
  // {
  //   id: "3",
  //   ideaTitle: "Dev Productivity Copilot",
  //   fullName: "Jayesh Thorat",
  //   role: "Frontend Developer",
  //   problemStatement:
  //     "Developers spend too much time on repetitive tasks.",
  //   proposedSolution:
  //     "AI copilot to automate reviews, docs and code generation.",
  //   benefits: "Faster delivery",
  //   techStack: "React, GPT, Node",
  //   upvotes: [],
  //   comments: [],
  //   status: "draft",
  //   createdAt: "2025-09-15",
  //   createdBy: CURRENT_USER_ID,
  // },
];

function BrowseIdeas() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");

  const filteredIdeas = useMemo(() => {
    let ideas = [...sampleIdeas];

    // 🔎 Search
    if (search) {
      const q = search.toLowerCase();
      ideas = ideas.filter(
        (idea) =>
          idea.ideaTitle?.toLowerCase().includes(q) ||
          idea.problem?.toLowerCase().includes(q) ||
          idea.solution?.toLowerCase().includes(q) ||
          idea.fullName?.toLowerCase().includes(q)
      );
    }

    // 🔽 Tabs
    if (activeTab === "selected") {
      ideas = ideas.filter((idea) => idea.status === "approved for hackathon");
    }

    if (activeTab === "my-ideas") {
      ideas = ideas.filter((idea) => idea.createdBy === CURRENT_USER_ID);
    }

    // ↕ Sorting
    if (sort === "newest") {
      ideas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "oldest") {
      ideas.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === "most_upvotes") {
      ideas.sort((a, b) => b.upvotes.length - a.upvotes.length);
    }

    return ideas;
  }, [search, sort, activeTab]);

  return (
    <div>
      {/* 🔍 TOP FILTERS */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          {/* Search */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Search Ideas
            </label>
            <input
              type="text"
              placeholder="Search by title, problem, solution..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm pl-10 focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
            />
            <Search size={18} className="absolute left-3 top-7 text-gray-400" />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              {/* <option value="most_upvotes">Most Upvotes</option> */}
            </select>
          </div>
        </div>
      </div>

      {/* 📑 LOWER TABS */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8 -mb-px">
          {[
            { id: "all", label: "All Ideas" },
            { id: "selected", label: "Selected for Hackathon" },
            { id: "my-ideas", label: "My Ideas" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`ideathon-tab-link ${
                activeTab === tab.id ? "active" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 🧠 IDEA LIST */}
      <div className="space-y-8">
        {filteredIdeas.length === 0 ? (
          <p className="text-center text-gray-500">No ideas found.</p>
        ) : (
          filteredIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              mode="browse"
              currentUserId={CURRENT_USER_ID}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseIdeas;
