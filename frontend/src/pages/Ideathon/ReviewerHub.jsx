import { useEffect, useMemo, useState } from "react";
import IdeaCard from "../../components/IdeaCard";
// import { sampleIdea } from "./sampleIdea";
import { sampleIdeas } from "../../data/sampleIdeas";
import { getAverageScore } from "../../utils/getAverageScore";
import AssignReviewerModal from "../../components/AssignReviewerModal";

const ideas = sampleIdeas;
const SORT_OPTIONS = [
  { value: "newest", label: "Newest Submission" },
  { value: "oldest", label: "Oldest Submission" },
  { value: "highest_score", label: "Highest Average Score" },
  { value: "most_upvotes", label: "Most Upvotes" },
  { value: "needs_review", label: "Needs My Review" },
];

function ReviewerHub({ ideas = [], currentUser = { id: 1, role: "admin" } }) {
  const [sortBy, setSortBy] = useState("newest");
  const [selectedIdea, setSelectedIdea] = useState(null);

  /**
   * Sorting logic (equivalent to updateReviewerBoard)
   */
  const sortedIdeas = useMemo(() => {
    let list = [...sampleIdeas];

    switch (sortBy) {
      case "oldest":
        return list.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

      case "highest_score":
        return list.sort((a, b) => getAverageScore(b) - getAverageScore(a));

      case "most_upvotes":
        return list.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

      case "needs_review":
        return list.filter((idea) => !idea.judgments?.[currentUser.id]);

      case "newest":
      default:
        return list.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  }, [ideas, sortBy, currentUser.id]);

  return (
    <div className="space-y-8">
      {/* SORT CARD */}
      <div className="card">
        <div className="flex items-center gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Sort Ideas By:
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm
              focus:border-[#FFB700]
              focus:ring-2
              focus:ring-[#FFB700]/40"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* REVIEWER BOARD */}
      <div className="space-y-8">
        {sortedIdeas.length === 0 ? (
          <p className="text-center text-gray-500">No ideas found.</p>
        ) : (
          sortedIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              mode="review"
              isReviewer={true}
              isAdmin={true}
              currentUserId={currentUser.id}
              ratingCriteria={[
                { id: "business", label: "Business Feasibility" },
                { id: "operational", label: "Operational Feasibility" },
                { id: "technical", label: "Technical Feasibility" },
              ]}
              onAssignReviewer={setSelectedIdea}
            />
          ))
        )}

        {selectedIdea && (
          <AssignReviewerModal
            idea={selectedIdea}
            onClose={() => setSelectedIdea(null)}
          />
        )}
      </div>
    </div>
  );
}

export default ReviewerHub;
