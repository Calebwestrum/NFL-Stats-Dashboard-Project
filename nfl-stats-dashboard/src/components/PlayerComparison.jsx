function PlayerComparison({ players }) {
    if (players.length === 0) {
        return null;
    }

    return (
        <section className="player-comparison">
            <h2>Player Comparison</h2>

            <div className="comparison-players">
                {players.map((player) => (
                    <div key={player.id} className="comparison-player">
                        <h3>{player.name}</h3>
                        <p>{player.team} - {player.position}</p>

                        {player.position === "QB" && (
                            <div className="comparison-stats">
                                <p>Passing Yards: {player.passingYards.toLocaleString()}</p>
                                <p>Passing TDs: {player.passingTouchdowns}</p>
                                <p>Interceptions: {player.interceptions}</p>
                            </div>
                        )}
                        {player.position === "RB" && (
                            <div className="comparison-stats">
                                <p>Rushing Yards: {player.rushingYards.toLocaleString()}</p>
                                <p>Rushing TDs: {player.rushingTouchdowns}</p>
                                <p>Receiving Yards: {player.receivingYards.toLocaleString()}</p>
                                <p>Receiving TDs: {player.receivingTouchdowns}</p>
                            </div>
                        )}
                        {(player.position === "WR" || player.position === "TE") && (
                            <div className="comparison-stats">
                                <p>Receiving Yards: {player.receivingYards.toLocaleString()}</p>
                                <p>Receiving TDs: {player.receivingTouchdowns}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PlayerComparison;