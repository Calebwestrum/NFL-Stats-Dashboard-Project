import "./App.css";
import {useState} from 'react';
import players from './data/players';

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
      <section className="player-card" key={player.id}>
        <h2>{player.name}</h2>
        <p>{player.team} - {player.position}</p>

        <div className="stats">
          <div>
            <h3>{player.passingYards.toLocaleString()}</h3>
            <p>Passing Yards</p>
          </div>

          <div>
            <h3>{player.passingTouchdowns}</h3>
            <p>Passing TDs</p>
          </div>

          <div>
            <h3>{player.interceptions}</h3>
            <p>Interceptions</p>
          </div>
        </div>
      </section>
      ))}

      {filteredPlayers.length === 0 && (
        <p>No players found.</p>
      )}

    </main>
  )
}

export default App
