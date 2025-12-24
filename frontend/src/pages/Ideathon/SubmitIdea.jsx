import { useState } from "react";

function IdeaSubmissionForm({ idea = null, onClose }) {
  const isEditing = Boolean(idea);
  // const isEditing = true;

  const [form, setForm] = useState({
    teamName: idea?.teamName || "",
    teamMembers: idea?.teamMembers || [
      {
        fullName: idea?.fullName || "",
        serviceline: idea?.serviceline || "",
        bu: idea?.bu || "",
        customerName: idea?.customerName || "",
      },
    ],

    // fullName: idea?.fullName || "",
    // serviceline: idea?.serviceline || "",
    // bu: idea?.bu || "",
    // customerName: idea?.customerName || "",
    role: idea?.role || "",
    ideaTitle: idea?.ideaTitle || "",
    problem: idea?.problem || "",
    targetDomain: idea?.targetDomain || "",
    innovationTrack: idea?.innovationTrack || "",
    painPoints: idea?.painPoints || "",
    impactedAreas: idea?.impactedAreas || "",
    availableData: idea?.availableData || "",
    solution: idea?.solution || "",
    benefits: idea?.benefits || "",
    benefittedAreas: idea?.benefittedAreas || [],
    stakeholders: idea?.stakeholders || "",
    stakeholdersOther: idea?.stakeholdersOther || "",
    techStack: idea?.techStack || "",
    collateralsLink: idea?.collateralsLink || "",
    architectureLink: idea?.architectureLink || "",
    mvpConfirmation: idea?.mvpConfirmation || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.mvpConfirmation) {
      alert("Please complete the Feasibility Check before submitting.");
      return;
    }
    const finalStakeholder =
      form.stakeholders === "Other"
        ? form.stakeholdersOther
        : form.stakeholders;
    const submissionData = { ...form, stakeholders: finalStakeholder };
    console.log(isEditing ? "Save Changes" : "Submit Idea", submissionData);
  };

  const handleTeamChange = (index, field, value) => {
    const updatedMembers = [...form.teamMembers];
    updatedMembers[index][field] = value;
    setForm((prev) => ({ ...prev, teamMembers: updatedMembers }));
  };

  const addTeamMember = () => {
    if (form.teamMembers.length >= 3) return;

    setForm((prev) => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        { fullName: "", serviceline: "", bu: "", customerName: "" },
      ],
    }));
  };

  const removeTeamMember = (index) => {
    setForm((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isEditing ? "Edit Idea" : "Submit Your Idea"}
        </h2>

        {!isEditing && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 ">
        {/* Row 1 */}
        {/* ================= TEAM DETAILS ================= */}
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">
          Team Details
        </h3>

        {/* Team Name */}
        <div>
          <label className="block text-sm font-medium">Team Name</label>
          <input
            type="text"
            required
            value={form.teamName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, teamName: e.target.value }))
            }
            placeholder="Enter team name"
            className="input"
          />
        </div>

        {/* Team Members */}
        {form.teamMembers.map((member, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">
                {index === 0 ? "Team Leader" : `Team Member ${index}`}
              </h4>

              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={member.fullName}
                  onChange={(e) =>
                    handleTeamChange(index, "fullName", e.target.value)
                  }
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Service Line
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Digital, Consulting"
                  value={member.serviceline}
                  onChange={(e) =>
                    handleTeamChange(index, "serviceline", e.target.value)
                  }
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Business Unit
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BFSI, Healthcare"
                  value={member.bu}
                  onChange={(e) =>
                    handleTeamChange(index, "bu", e.target.value)
                  }
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Client or customer name"
                  value={member.customerName}
                  onChange={(e) =>
                    handleTeamChange(index, "customerName", e.target.value)
                  }
                  className="input"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Team Member Button */}
        {form.teamMembers.length < 3 && (
          <button
            type="button"
            onClick={addTeamMember}
            className="btn-secondary text-sm px-4 py-2"
          >
            + Add Team Member (Optional)
          </button>
        )}

        {/* Row 2 */}

        {/* Rows 3–4 */}
        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Your Idea</h3>
        <div>
          <label className="block text-sm font-medium">Idea Title</label>
          <input
            type="text"
            required
            name="ideaTitle"
            placeholder="Short, clear idea title"
            value={form.ideaTitle}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT COLUMN – Inputs & Dropdowns */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <label className="block text-sm font-medium">Your Role</label>
              <input
                type="text"
                required
                name="role"
                placeholder="e.g. Developer, Analyst"
                value={form.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Target Domain</label>
              <select
                name="targetDomain"
                required
                value={form.targetDomain}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              >
                <option value="">Select</option>
                <option value="Healthcare & Life Sciences (HLS)">
                  Healthcare & Life Sciences (HLS)
                </option>
                <option value="High-Tech">High-Tech</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Innovation Track
              </label>
              <select
                name="innovationTrack"
                required
                value={form.innovationTrack}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              >
                <option value="">Select</option>
                <option value="Process Re-engineering with AI">
                  Process Re-engineering with AI
                </option>
                <option value="New Process Development with AI">
                  New Process Development with AI
                </option>
                <option value="App Modernization / New Product Build">
                  App Modernization / New Product Build
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Available Data
              </label>
              <select
                name="availableData"
                required
                value={form.availableData}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Partially Available">Partially Available</option>
              </select>
            </div>
          </div>

          {/* RIGHT COLUMN – Textareas */}
          <div className="md:col-span-9 space-y-6">
            <div>
              <label className="block text-sm font-medium">
                Problem Statement (I struggle with..)
              </label>
              <textarea
                required
                name="problem"
                rows={2}
                placeholder="Describe the problem you are trying to solve..."
                value={form.problem}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Pain Points (Root Causes)
              </label>
              <textarea
                required
                name="painPoints"
                rows={2}
                placeholder="Key challenges or pain points"
                value={form.painPoints}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Impacted Areas
              </label>
              <textarea
                required
                name="impactedAreas"
                rows={2}
                placeholder="Processes, teams, or systems impacted"
                value={form.impactedAreas}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              />
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT COLUMN – Textareas */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <label className="block text-sm font-medium">
                Proposed Solution
              </label>
              <textarea
                required
                name="solution"
                rows={4}
                placeholder="Explain your proposed solution"
                value={form.solution}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Benefits</label>
              <textarea
                required
                name="benefits"
                rows={4}
                placeholder="Expected benefits and value"
                value={form.benefits}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              />
            </div>
          </div>

          {/* RIGHT COLUMN – Selections */}
          <div className="md:col-span-6 space-y-6">
            {/* Benefitted Areas */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Benefitted Areas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Cost Reduction",
                  "Revenue Growth",
                  "Productivity Improvement",
                  "Customer Experience",
                  "Risk Reduction",
                  "Compliance",
                  "Innovation Enablement",
                ].map((area) => (
                  <label key={area} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.benefittedAreas?.includes(area)}
                      onChange={() =>
                        setForm((prev) => ({
                          ...prev,
                          benefittedAreas: prev.benefittedAreas?.includes(area)
                            ? prev.benefittedAreas.filter((a) => a !== area)
                            : [...(prev.benefittedAreas || []), area],
                        }))
                      }
                    />
                    {area}
                  </label>
                ))}
              </div>
            </div>

            {/* Target Stakeholders */}
            <div>
              <label className="block text-sm font-medium">
                Target Stakeholders
              </label>

              <select
                name="stakeholders"
                required
                value={form.stakeholders}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    stakeholders: value,
                    stakeholdersOther:
                      value === "Other" ? prev.stakeholdersOther : "",
                  }));
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
              >
                <option value="">Select</option>
                <option value="Customers">Customers</option>
                <option value="Employees">Employees</option>
                <option value="Business / Organization">
                  Business / Organization
                </option>
                <option value="Partners">Partners</option>
                <option value="Other">Other</option>
              </select>

              {form.stakeholders === "Other" && (
                <input
                  type="text"
                  name="stakeholdersOther"
                  required
                  placeholder="Please specify"
                  value={form.stakeholdersOther}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
                />
              )}
            </div>
          </div>
        </div>

        {/* Row 7 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium">
              Required Tech Stack
            </label>
            <input
              type="text"
              required
              name="techStack"
              placeholder="e.g. React, Python, AWS"
              value={form.techStack}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Collaterals Link
            </label>
            <input
              required
              type="url"
              name="collateralsLink"
              placeholder="https://drive.google.com/..."
              value={form.collateralsLink}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Architecture Flow Link
            </label>
            <input
              required
              type="url"
              name="architectureLink"
              placeholder="https://miro.com / https://draw.io"
              value={form.architectureLink}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]/40"
            />
          </div>
        </div>

        {/* Feasibility Check */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="feasibilityCheck"
            checked={form.mvpConfirmation}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                mvpConfirmation: e.target.checked,
              }))
            }
            className="mt-1"
          />
          <label htmlFor="feasibilityCheck" className="text-sm text-gray-700">
            <span className="font-semibold">Feasibility Check:</span> I confirm
            we can build a working MVP/Demo of this idea within{" "}
            <span className="font-bold">4 days</span> using available data and
            approved tech stacks.
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {isEditing && (
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 btn-secondary"
            >
              Cancel
            </button>
          )}

          <button type="submit" className="w-full btn-primary">
            {isEditing ? "Save Changes" : "Submit Idea"}
          </button>
        </div>
      </form>
    </>
  );
}

export default IdeaSubmissionForm;
