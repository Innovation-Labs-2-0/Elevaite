import { useState } from "react";
import IdeathonTabs from "../../components/IdeathonTabs";
import IdeathonOverview from "./IdeathonOverview";
import SubmitIdea from "./SubmitIdea";
import BrowseIdeas from "./BrowseIdeas";
import ReviewerHub from "./ReviewerHub";
// import { getUser } from "../../components/UserMenu";

function IdeathonPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // const user = getUser();
  // const isReviewer = user.role === "reviewer";
  // const isAdmin = user.role === "admin";
  const isReviewer = true;

  return (
    <>
      {/* Tabs */}
      <IdeathonTabs
        activeTab={activeTab}
        isReviewer={isReviewer}
        // isAdmin={isAdmin}
        onTabChange={setActiveTab}
      />

      {/* Content */}
      {activeTab === "overview" && (
        <IdeathonOverview onNavigate={setActiveTab} />
      )}
      {activeTab === "browse" && <BrowseIdeas />}
      {activeTab === "submit" && <SubmitIdea />}
      {activeTab === "review" && (isReviewer || isAdmin) && <ReviewerHub />}
    </>
  );
}

export default IdeathonPage;
