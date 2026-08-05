import "./App.css";
import {useState} from 'react';
import players from './data/players';
import PlayerCard from "./components/PlayerCard";

function App(){
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All");
  const [team, setTeam] = useState("All");

  const teams = ["All",... new Set(players.map((player) => player.team)),];

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase()) &&
    (position === "All" || player.position === position) &&
    (team === "All" || player.team === team)
  );

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

      </div>

      {filteredPlayers.map((player) => (
        <PlayerCard key={player.id} player={player}></PlayerCard>
      ))}

      {filteredPlayers.length === 0 && (
        <p>No players found.</p>
      )}


    </main>
  )
}

export default App
