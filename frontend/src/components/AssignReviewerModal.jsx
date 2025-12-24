import { useEffect, useState } from "react";

const REVIEWERS = [
  { id: 1, name: "Alice Reviewer" },
  { id: 2, name: "Bob Reviewer" },
  { id: 3, name: "Charlie Reviewer" },
];

function AssignReviewerModal({ idea, onClose }) {
  const [selectedReviewer, setSelectedReviewer] = useState("");

  // 🔒 Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!idea) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Assign Reviewer – {idea.ideaTitle}
          </h3>
          <button onClick={onClose}>✕</button>
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
              console.log("Assigned", selectedReviewer, "to", idea.id);
              onClose();
            }}
            className="flex-1 bg-[#1B5287] text-white py-2 rounded-md disabled:bg-gray-300"
          >
            Assign
          </button>

          <button
            onClick={() => {
              console.log("Unassigned reviewer");
              onClose();
            }}
            className="flex-1 bg-gray-200 py-2 rounded-md"
          >
            Unassign
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignReviewerModal;
