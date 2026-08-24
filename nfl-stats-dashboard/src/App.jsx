import "./App.css";
import {useEffect, useState} from 'react';
import PlayerCard from "./components/PlayerCard";
import PlayerComparison from "./components/PlayerComparison";

function App(){
  const teamNames = {
    ARI: "Arizona Cardinals",
    ATL: "Atlanta Falcons",
    BAL: "Baltimore Ravens",
    BUF: "Buffalo Bills",
    CAR: "Carolina Panthers",
    CHI: "Chicago Bears",
    CIN: "Cincinnati Bengals",
    CLE: "Cleveland Browns",
    DAL: "Dallas Cowboys",
    DEN: "Denver Broncos",
    DET: "Detroit Lions",
    GB: "Green Bay Packers",
    HOU: "Houston Texans",
    IND: "Indianapolis Colts",
    JAX: "Jacksonville Jaguars",
    KC: "Kansas City Chiefs",
    LAC: "Los Angeles Chargers",
    LA: "Los Angeles Rams",
    LV: "Las Vegas Raiders",
    MIA: "Miami Dolphins",
    MIN: "Minnesota Vikings",
    NE: "New England Patriots",
    NO: "New Orleans Saints",
    NYG: "New York Giants",
    NYJ: "New York Jets",
    PHI: "Philadelphia Eagles",
    PIT: "Pittsburgh Steelers",
    SEA: "Seattle Seahawks",
    SF: "San Francisco 49ers",
    TB: "Tampa Bay Buccaneers",
    TEN: "Tennessee Titans",
    WAS: "Washington Commanders"
  };
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");
  const [team, setTeam] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [comparePlayers, setComparePlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
  const params = new URLSearchParams();

  if (position !== "All") {
    params.append("position", position);
  }

  if (team !== "All") {
    params.append("team", team);
  }

  fetch(`http://127.0.0.1:8000/players?${params.toString()}`)
    .then((response) => response.json())
    .then((data) => {
      setPlayers(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching players:", error);
      setLoading(false);
    });
}, [position, team]);

  const teams = ["All", ...Object.keys(teamNames)];

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPlayers = [...filteredPlayers].sort((a, b) =>{
    if (sortBy === "name"){
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "touchdowns") {
      return b.totalTouchdowns - a.totalTouchdowns;
    }

    return (b[sortBy] || 0) - (a[sortBy] || 0);
  })

  function clearFilters(){
    setSearch("");
    setPosition("All");
    setTeam("All");
    setSortBy("name");
  }

  function handleCompare(player){
    setComparePlayers((current) => {
      if (current.some((p) => p.id === player.id)){
        return current;
      }
      if (current.length >= 2){
        return current;
      }
      return [...current, player];
    });
  }

  function handleRemove(playerId) {
    setComparePlayers((current) =>
        current.filter((player) => player.id !== playerId)
    );
  }

  async function handlePlayerClick(playerId) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/players/${playerId}`
      );

      const data = await response.json();

      setSelectedPlayer(data);
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  }

  return(
    <main>
      <h1>NFL Stats Dashboard</h1>

      {selectedPlayer && (
        <section className="selected-player">
          <h2>{selectedPlayer.name}</h2>
          <p>
            {selectedPlayer.team} - {selectedPlayer.position}
          </p>
          <p>Passing Yards: {selectedPlayer.passingYards}</p>
          <p>Rushing Yards: {selectedPlayer.rushingYards}</p>
          <p>Receiving Yards: {selectedPlayer.receivingYards}</p>
          <p>Total Touchdowns: {selectedPlayer.totalTouchdowns}</p>
        </section>
      )}

      {loading && <p>Loading players...</p>}

      <div className="filters">

        <input type="text" placeholder="Search for a player..." value={search}
                onChange={(event) => setSearch(event.target.value)}></input>

        <select value={position} onChange={(event) => setPosition(event.target.value)}>
          <option value="All">All Positions</option>
          <option value="QB">Quarterbacks</option>
          <option value="RB">Running Backs</option>
          <option value="WR">Wide Receivers</option>
          <option value="TE">Tight Ends</option>
        </select>

        <select value={team} onChange={(event) => setTeam(event.target.value)}>
          {teams.map((teamCode) => (
            <option key={teamCode} value={teamCode}>
              {teamCode === "All" ? "All Teams" : teamNames[teamCode]}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="name">Sort: Player Name</option>
          <option value="passingYards">Most Passing Yards</option>
          <option value="rushingYards">Most Rushing Yards</option>
          <option value="receivingYards">Most Receiving Yards</option>
          <option value="touchdowns">Most Total Touchdowns</option>
        </select>

        <button onClick={clearFilters}>Clear Filters</button>

      </div>

      <PlayerComparison
        players={comparePlayers}
        onRemove={handleRemove}
      />

      <p className="player-count">
        Showing {sortedPlayers.length} players
      </p>

      {sortedPlayers.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onCompare={handleCompare}
          onPlayerClick={handlePlayerClick}
        />
      ))}

      {sortedPlayers.length === 0 && (
        <p>No players found.</p>
      )}


    </main>
  )
}

export default App
