import "./App.css";
import {useState} from 'react';
import players from './data/processed_players.json';
import PlayerCard from "./components/PlayerCard";

function App(){
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");
  const [team, setTeam] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const teams = ["All",... new Set(players.map((player) => player.team))];

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase()) &&
    (position === "All" || player.position === position) &&
    (team === "All" || player.team === team)
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

  return(
    <main>
      <h1>NFL Stats Dashboard</h1>

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
          {teams.map((teamName) => (
            <option key={teamName} value={teamName}>
              {teamName === "All" ? "All Teams" : teamName}
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

      <p className="player-count">
        Showing {sortedPlayers.length} players
      </p>

      {sortedPlayers.map((player) => (
        <PlayerCard key={player.id} player={player}></PlayerCard>
      ))}

      {filteredPlayers.length === 0 && (
        <p>No players found.</p>
      )}


    </main>
  )
}

export default App
