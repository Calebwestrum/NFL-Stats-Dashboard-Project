
function PlayerCard({player}){
    return (
        <section className="player-card">
            <h2>{player.name}</h2>

            <p>{player.team} - {player.position}</p>

            <div className="stats">
                <div>
                    <h3>{player.passingYards.toLocaleString()}</h3>
                    <p>Passing Yards</p>
                </div>

                <div>
                    <h3>{player.passingTouchdowns}</h3>
                    <p>Passing Yards</p>
                </div>

                <div>
                    <h3>{player.interceptions}</h3>
                    <p>Passing Yards</p>
                </div>
            </div>
        </section>
    )
}

export default PlayerCard;