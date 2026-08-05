
function PlayerCard({player}){
    return (
        <section className="player-card">
            <h2>{player.name}</h2>

            <p>{player.team} - {player.position}</p>

            <div className="stats">
                {player.position === "QB" && (
                    <>
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
                    </>
                )}

                {player.position === "RB" && (
                    <>
                        <div>
                            <h3>{player.rushingYards.toLocaleString()}</h3>
                            <p>Rushing Yards</p>
                        </div>

                        <div>
                            <h3>{player.rushingTouchdowns}</h3>
                            <p>Rushing TDs</p>
                        </div>

                        <div>
                            <h3>{player.receivingYards.toLocaleString()}</h3>
                            <p>Receiving Yards</p>
                        </div>

                        <div>
                            <h3>{player.rushingTouchdowns}</h3>
                            <p>Receiving TDs</p>
                        </div>
                    </>
                )}

                {(player.position === "WR" || player.position === "TE") && (
                    <>
                        <div>
                            <h3>{player.receivingYards.toLocaleString()}</h3>
                            <p>Receiving Yards</p>
                        </div>

                        <div>
                            <h3>{player.receivingTouchdowns}</h3>
                            <p>Receiving TDs</p>
                        </div>

                    </>
                )}
            </div>
        </section>
    )
}

export default PlayerCard;