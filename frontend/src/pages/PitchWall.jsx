import React, { useState, useMemo } from 'react';
import { Plus, Search, Video, MapPin, Trophy, LayoutGrid, X, User } from 'lucide-react';
import './PitchWall.css';

// --- Components ---

// 1. Leaderboard Component
const Leaderboard = ({ pitches }) => {
  // Logic: Aggregate scores by Author
  const leaderboardData = useMemo(() => {
    const stats = {};

    pitches.forEach(pitch => {
      const author = pitch.author;
      if (!stats[author]) {
        stats[author] = { 
          name: author, 
          totalPoints: 0, 
          ideasCount: 0, 
          videoCount: 0, 
          physicalCount: 0 
        };
      }
      
      // Points Calculation Rules:
      // 1 Point for Submission
      // +1 Point for Video
      // +1 Point for Physical Wall
      let pitchPoints = 1; 
      if (pitch.hasVideo) pitchPoints += 1;
      if (pitch.isPhysical) pitchPoints += 1;

      stats[author].totalPoints += pitchPoints;
      stats[author].ideasCount += 1;
      if (pitch.hasVideo) stats[author].videoCount += 1;
      if (pitch.isPhysical) stats[author].physicalCount += 1;
    });

    // Convert to array and sort by Total Points (Desc)
    return Object.values(stats).sort((a, b) => b.totalPoints - a.totalPoints);
  }, [pitches]);

  return (
    <div className="leaderboard-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#003d80' }}>🏆 Top Innovators</h2>
        <p style={{ color: '#666' }}>Earn points: 1 per Idea + 1 Video Bonus + 1 Physical Wall Bonus</p>
      </div>

      <table className="lb-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>Rank</th>
            <th>Name</th>
            <th style={{ textAlign: 'center' }}>Ideas Submitted</th>
            <th style={{ textAlign: 'center' }}>Bonuses (Vid/Wall)</th>
            <th style={{ textAlign: 'right' }}>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user.name} className={`rank-${index+1}`}>
              <td>
                <div className="rank-circle">{index + 1}</div>
              </td>
              <td>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user.name}</div>
              </td>
              <td style={{ textAlign: 'center' }}>{user.ideasCount}</td>
              <td style={{ textAlign: 'center', color: '#666' }}>
                {user.videoCount} 📹 / {user.physicalCount} 📍
              </td>
              <td style={{ textAlign: 'right' }}>
                <span className="points-pill">{user.totalPoints} pts</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 2. Pitch Wall Component
const WallGrid = ({ pitches, onAddClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPitches = pitches.filter(pitch =>
    pitch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pitch.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="controls">
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '12px', color: '#888' }} />
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search ideas..." 
            style={{ paddingLeft: '35px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={onAddClick}>
          <Plus size={20} /> Submit Idea
        </button>
      </div>

      <div className="wall-grid">
        {filteredPitches.map((pitch) => (
          <div key={pitch.id} className="pitch-card" style={{ backgroundColor: pitch.color }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#555', marginBottom: '0.5rem' }}>
              <span><User size={14} style={{ marginRight: '4px' }}/> {pitch.author}</span>
              <span style={{ fontWeight: 'bold', color: '#0056b3' }}>
                +{1 + (pitch.hasVideo ? 1 : 0) + (pitch.isPhysical ? 1 : 0)} pts
              </span>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#222' }}>{pitch.title}</h3>
            <p style={{ fontSize: '0.95rem', color: '#444', flexGrow: 1, lineHeight: '1.5' }}>{pitch.description}</p>

            <div className="pitch-badges">
              {pitch.hasVideo && (
                <div className="badge video"><Video size={12} /> Video Pitch (+1)</div>
              )}
              {pitch.isPhysical && (
                <div className="badge wall"><MapPin size={12} /> Wall Copy (+1)</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Container ---

const PitchWallApp = () => {
  const [activeTab, setActiveTab] = useState('wall'); // 'wall' or 'leaderboard'
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dummy Initial Data
  const [pitches, setPitches] = useState([
    { id: 1, title: "Automated Invoice Processing", description: "Finance team spends 15h/week manual entry.", author: "Sarah Jenkins", hasVideo: true, isPhysical: true, color: "#e3f2fd" },
    { id: 2, title: "QA GenAI Data", description: "Need synthetic data for testing.", author: "Rahul M.", hasVideo: false, isPhysical: false, color: "#fff9c4" },
    { id: 3, title: "HR Bot", description: "Policy search is too slow.", author: "Rahul M.", hasVideo: true, isPhysical: true, color: "#e8f5e9" }, // Rahul has 2 submissions to test leaderboard
  ]);

  // Form State
  const [formData, setFormData] = useState({
    title: '', description: '', author: '', videoLink: '', isPhysical: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const colors = ["#e3f2fd", "#fff9c4", "#e8f5e9", "#fce4ec"];
    
    const newPitch = {
      id: pitches.length + 1,
      title: formData.title,
      description: formData.description,
      author: formData.author,
      hasVideo: formData.videoLink.length > 0,
      isPhysical: formData.isPhysical,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setPitches([newPitch, ...pitches]);
    setIsModalOpen(false);
    setFormData({ title: '', description: '', author: '', videoLink: '', isPhysical: false });
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#003d80', fontSize: '2.5rem', margin: '0', fontWeight: 'bold' }}>ElevAIte Pitch Wall</h1>
        <p style={{ color: '#666' }}>Post your ideas, earn points, and climb the leaderboard!</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'wall' ? 'active' : ''}`}
          onClick={() => setActiveTab('wall')}
        >
          <LayoutGrid size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }}/>
          Submission Wall
        </button>
        <button 
          className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }}/>
          Leaderboard
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'wall' ? (
        <WallGrid pitches={pitches} onAddClick={() => setIsModalOpen(true)} />
      ) : (
        <Leaderboard pitches={pitches} />
      )}

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2>Submit Idea (+1 Point)</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="author" required placeholder="Full Name" value={formData.author} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" required placeholder="Problem Title" value={formData.title} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" required rows="3" placeholder="I struggle with..." value={formData.description} onChange={handleInputChange}></textarea>
              </div>
              <div className="form-group">
                <label>Video Link (+1 Bonus Point)</label>
                <input type="url" name="videoLink" placeholder="https://..." value={formData.videoLink} onChange={handleInputChange} />
              </div>
              
              <div className="checkbox-group" style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
                <input 
                  type="checkbox" 
                  id="chkPhysical" 
                  name="isPhysical" 
                  checked={formData.isPhysical} 
                  onChange={handleInputChange} 
                  style={{ width: 'auto' }}
                />
                <label htmlFor="chkPhysical" style={{ margin: 0, cursor: 'pointer' }}>
                  <strong>I posted this on the Physical Wall (+1 Point)</strong>
                </label>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="add-btn" style={{ display: 'inline-block' }}>Submit & Earn Points</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PitchWallApp;