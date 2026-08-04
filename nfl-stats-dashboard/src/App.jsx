import "./App.css";
import {useState} from 'react';
import players from './data/players';
import PlayerCard from "./components/PlayerCard";

function App(){
  const [search, setSearch] = useState("");

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return(
    <main>
      <h1>NFL Stats Dashboard</h1>

      <input type="text" placeholder="Search for a player..." value={search}
              onChange={(event) => setSearch(event.target.value)}></input>

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
