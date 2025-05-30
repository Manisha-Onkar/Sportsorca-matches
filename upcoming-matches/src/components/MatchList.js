import React, { useEffect, useState } from 'react';
import '../styles.css'; 

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4335') // La Liga
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.events) {
          setMatches(data.events);
        } else {
          // Fallback sample data
          const sampleMatches = [
            {
              idEvent: '101',
              strHomeTeam: 'Manchester United',
              strAwayTeam: 'Liverpool',
              dateEvent: '2025-06-05',
              strTime: '16:30:00',
            },
            {
              idEvent: '102',
              strHomeTeam: 'Real Madrid',
              strAwayTeam: 'Barcelona',
              dateEvent: '2025-06-06',
              strTime: '21:00:00',
            },
            {
              idEvent: '103',
              strHomeTeam: 'Bayern Munich',
              strAwayTeam: 'Borussia Dortmund',
              dateEvent: '2025-06-07',
              strTime: '19:45:00',
            },
            {
              idEvent: '104',
              strHomeTeam: 'Juventus',
              strAwayTeam: 'Inter Milan',
              dateEvent: '2025-06-08',
              strTime: '18:00:00',
            },
          ];
          setMatches(sampleMatches);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading matches...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (matches.length === 0) return <p className="no-matches">No upcoming matches found.</p>;

  return (
    <div className="match-container">
      <h2 className="match-title">Upcoming Soccer Matches</h2>
      {matches.map((match) => (
        <div key={match.idEvent} className="match-card">
          <div className="match-teams">
            {match.strHomeTeam} <span className="vs-text">vs</span> {match.strAwayTeam}
          </div>
          <div className="match-details">
            Date: {match.dateEvent} | Time: {match.strTime}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
