import "./App.css";

function App(){
  const player = {
    name: "Josh Allen",
    team: "Buffalo Bills",
    position: "QB",
    passingYards: 3668,
    passingTouchdowns: 25,
    interceptions: 10,
  }

  return(
    <main>
      <h1>NFL Stats Dashboard</h1>

      <input type="text" placeholder="Search for a player..."></input>
      <section className="player-card">
        <h2>{player.name}</h2>
        <p>{player.team} - {player.position}</p>

        <div className="stats">
          <div>
            <h3>{player.passingYards}</h3>
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
    </main>
  )
}

export default App
