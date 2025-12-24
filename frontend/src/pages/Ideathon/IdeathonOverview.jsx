import { useState, useEffect } from "react";
import { Send, Search } from "lucide-react";

function IdeathonOverview({ onNavigate }) {
  // 🔹 HARD-CODED IDEATHON CONFIG
  const IDEATHON_TITLE = "Ideathon 2025: Shape The Future";
  const IDEATHON_END_DATE = new Date("2026-01-31T23:59:59");

  const PRIZES = [
    {
      icon: "🏆",
      description:
        "Top 3 ideas get a budget for a proof-of-concept, mentorship, and company-wide recognition. and Most importantly Pool of 1,00,000 INR or  1000 USD.",
    },
  ];

  const [timeLeft, setTimeLeft] = useState(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = IDEATHON_END_DATE - now;

      if (distance <= 0) {
        setClosed(true);
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl main-title">
          {IDEATHON_TITLE}
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Unleash your creativity and propose solutions for our biggest
          challenges. Your next idea could redefine our business.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => onNavigate("submit")}
          >
            <Send size={18} />
            Submit Your Idea
          </button>

          <button
            className="btn-secondary flex items-center gap-2"
            onClick={() => onNavigate("browse")}
          >
            <Search size={18} />
            Browse Ideas
          </button>
        </div>

        {/* Countdown */}
        <div className="card max-w-2xl mx-auto mt-8">
          <h3 className="text-lg font-semibold text-gray-700">
            Time Left to Submit
          </h3>

          <div className="flex justify-center items-baseline gap-4 mt-2 text-[#1B5287]">
            {closed ? (
              <span className="text-2xl font-bold text-[#FFB700]">
                Submissions Closed
              </span>
            ) : (
              timeLeft && (
                <>
                  <div>
                    <span className="text-4xl font-bold">{timeLeft.days}</span>
                    <span className="text-sm block">days</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold">{timeLeft.hours}</span>
                    <span className="text-sm block">hours</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-sm block">mins</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-sm block">secs</span>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>

      {/* How it works + Key Dates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">How It Works</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li><strong>Submit:</strong> Articulate a problem and solution.</li>
            <li><strong>Discuss:</strong> Browse and upvote ideas.</li>
            <li><strong>Review:</strong> Expert panel evaluates.</li>
            <li><strong>Hackathon:</strong> Build your build.</li>
            <li><strong>Win:</strong> Best ideas get recognized.</li>
          </ol>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Key Dates</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-[#1B5287] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4">
                1
              </span>
              <div><strong>Jan 8- Jan 31:</strong> Submissions Open</div>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                2
              </span>
              <div><strong>Feb 2  - Feb 17:</strong> Review Period</div>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                3
              </span>
              <div><strong>Feb 21:</strong> Hackathon Starts </div>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                4
              </span>
              <div><strong>March 10:</strong> Demo Day and Winners Announced </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Prizes */}
      <div className="card bg-linear-to-r from-[#1B5287] to-[#2563eb] text-white">
        <h3 className="text-2xl font-bold text-center mb-4">
          Prizes & Recognition
        </h3>

        {PRIZES.map((prize, index) => (
          <p key={index} className="text-center max-w-3xl mx-auto">
            {prize.icon} {prize.description}
          </p>
        ))}
      </div>
    </div>
  );
}

export default IdeathonOverview;
