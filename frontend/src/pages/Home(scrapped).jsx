import { useNavigate } from "react-router-dom";


function HomePage({ onNavigate }) {

  const navigate = useNavigate()

  return (
    <>
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl main-title">
          Welcome to InnovAIte Hub
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Your central place for ideas and innovation. Choose your path below.
        </p>
      </div>

      {/* Portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Ideathon */}
        <div
          className="portal-card card cursor-pointer"
          onClick={() => navigate("ideathon")}
        >
          <h2 className="text-3xl font-bold text-[#1B5287]">Ideathon</h2>
          <p className="mt-2 text-gray-600">
            Got a brilliant idea? Submit it for review, shape the future, and see
            it come to life.
          </p>
        </div>

        {/* Hackathon */}
        <div
          className="portal-card card cursor-pointer"
          onClick={() => navigate("hackathon")}
        >
          <h2 className="text-3xl font-bold text-[#1B5287]">Hackathon</h2>
          <p className="mt-2 text-gray-600">
            Ready to build? Submit your project, rate other builds, and climb the
            leaderboard.
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
