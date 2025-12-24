import { useState, useMemo } from "react";
import StarRatingInput from "./StarRatingInput";
import { useAuth } from "../context/AuthContext";

/* ------------------ Dummy Reviewers ------------------ */
const REVIEWERS = [
  { id: 1, name: "Alice Reviewer" },
  { id: 2, name: "Bob Reviewer" },
  { id: 3, name: "Charlie Reviewer" },
];

function IdeaCard({
  idea,
  currentUserId,
  ratingCriteria = [],
  onAssignReviewer,
}) {
  const existingJudgment = idea.judgments?.[currentUserId] || null;

  const [ratings, setRatings] = useState(
    existingJudgment ||
      ratingCriteria.reduce((acc, c) => {
        acc[c.id] = 0;
        return acc;
      }, {})
  );

  const [showReviewerModal, setShowReviewerModal] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState("");

  const { user } = useAuth();

  const STATUS_STYLES = {
    approved: "bg-blue-100 text-blue-700",
    reviewing: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    "approved for hackathon": "bg-green-100 text-green-700",
  };

  const handleRatingChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("Submitted review:", ratings);
  };

  /* ------------------ Average score calculation ------------------ */
  const avgScores = useMemo(() => {
    const totals = {};
    const counts = {};

    ratingCriteria.forEach((c) => {
      totals[c.id] = 0;
      counts[c.id] = 0;
    });

    Object.values(idea.judgments || {}).forEach((judgment) => {
      ratingCriteria.forEach((c) => {
        if (judgment[c.id]) {
          totals[c.id] += judgment[c.id];
          counts[c.id]++;
        }
      });
    });

    return ratingCriteria.reduce((acc, c) => {
      acc[c.id] = counts[c.id] ? totals[c.id] / counts[c.id] : 0;
      return acc;
    }, {});
  }, [idea.judgments, ratingCriteria]);

  const judgeCount = Object.keys(idea.judgments || {}).length;

  return (
    <div className="card space-y-4">
      {/* ================= IDEA DETAILS ================= */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-2xl font-bold">{idea.ideaTitle}</h3>

          {idea.status && (
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-md capitalize ${
                STATUS_STYLES[idea.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {idea.status}
            </span>
          )}

          {/* Assign reviewer (Admin action) */}
          {user.role === "admin" && (
          <button
            onClick={() => onAssignReviewer(idea)}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
          >
            Assign Reviewer
          </button>
          )}
        </div>

        <p className="text-sm text-gray-600 font-medium">
          by {idea.fullName} ({idea.role})
        </p>

        <div className="text-sm text-gray-500">
          <span>{idea.serviceline}</span> • <span>{idea.bu}</span> •{" "}
          <span>{idea.customerName}</span>
        </div>

        <p className="text-gray-700">
          <strong>Problem:</strong> {idea.problem}
        </p>

        <p className="text-gray-700">
          <strong>Proposed Solution:</strong> {idea.solution}
        </p>

        <p className="text-gray-700">
          <strong>Pain Points:</strong> {idea.painPoints}
        </p>

        <p className="text-gray-700">
          <strong>Impacted Areas:</strong> {idea.impactedAreas}
        </p>

        <p className="text-gray-700">
          <strong>Available Data:</strong> {idea.availableData}
        </p>

        <p className="text-gray-700">
          <strong>Benefits:</strong> {idea.benefits}
        </p>

        {idea.benefittedAreas?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {idea.benefittedAreas.map((area) => (
              <span
                key={area}
                className="text-xs bg-blue-100 text-[#1B5287] px-2 py-1 rounded-md"
              >
                {area}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm">
          <strong>Tech Stack:</strong>{" "}
          <span className="font-mono text-xs bg-gray-100 p-1 rounded">
            {idea.techStack}
          </span>
        </p>

        <div className="flex gap-2">
          {idea.collateralsLink && (
            <a
              href={idea.collateralsLink}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-sm"
            >
              View Collaterals
            </a>
          )}
          {idea.architectureLink && (
            <a
              href={idea.architectureLink}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-sm"
            >
              View Architecture
            </a>
          )}
        </div>
      </div>

      {/* ================= REVIEWER SECTION ================= */}
      {(user.role === "reviewer" || user.role === "admin") && (
        <div className="mt-6 border-t pt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reviewer Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold">Reviewer Dashboard</h4>

            <div className="bg-gray-50 p-3 rounded-lg space-y-3">
              {ratingCriteria.map((crit) => (
                <div key={crit.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{crit.label}</span>
                    <span>{avgScores[crit.id].toFixed(1)} / 5</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-[#1B5287] h-2 rounded-full"
                      style={{
                        width: `${(avgScores[crit.id] / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="text-sm text-center">
              <p className="font-bold text-lg">{judgeCount}</p>
              <p className="text-gray-500">Reviews</p>
            </div> */}
          </div>

          {/* Review Form */}
          <div className="space-y-4">
            <h4 className="font-semibold">Your Review & Actions</h4>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              {ratingCriteria.map((crit) => (
                <StarRatingInput
                  key={crit.id}
                  label={crit.label}
                  value={ratings[crit.id]}
                  disabled={Boolean(existingJudgment)}
                  onChange={(val) => handleRatingChange(crit.id, val)}
                />
              ))}

              <button
                type="submit"
                disabled={Boolean(existingJudgment)}
                className="w-full bg-blue-100 text-[#1B5287] py-2 rounded-md disabled:bg-gray-200"
              >
                {existingJudgment ? "Review Submitted" : "Submit Review"}
              </button>
            </form>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#1B5287] text-white py-1 rounded-md">
                Approve
              </button>
              <button className="flex-1 bg-gray-500 text-white py-1 rounded-md">
                Reviewing
              </button>
              <button className="flex-1 bg-[#FFB700] py-1 rounded-md">
                Reject
              </button>
              <button className="flex-1 bg-green-600 text-white py-1 rounded-md">
                Approve for Hackathon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ASSIGN REVIEWER MODAL ================= */}
      {showReviewerModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Assign Reviewer</h3>
              <button onClick={() => setShowReviewerModal(false)}>✕</button>
            </div>

            <select
              value={selectedReviewer}
              onChange={(e) => setSelectedReviewer(e.target.value)}
              className="w-full rounded-md border-gray-300"
            >
              <option value="">Select reviewer</option>
              {REVIEWERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                disabled={!selectedReviewer}
                onClick={() => {
                  console.log("Assigned reviewer:", selectedReviewer);
                  setShowReviewerModal(false);
                }}
                className="flex-1 bg-[#1B5287] text-white py-2 rounded-md disabled:bg-gray-300"
              >
                Assign
              </button>

              <button
                onClick={() => {
                  console.log("Unassigned reviewer");
                  setShowReviewerModal(false);
                }}
                className="flex-1 bg-gray-200 py-2 rounded-md"
              >
                Unassign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IdeaCard;
