

function PlayerCard({player, onCompare}){
    return(
    <section className={`player-card ${player.position.toLowerCase()}`}>
        <div className="player-header">
            {player.image && (
                <img
                    src={player.image}
                    alt={player.name}
                    className="player-image"
                />
            )}
            <div>
                <h2>{player.name}</h2>
                <p>
                    {player.team}
                    <span className={`position-badge ${player.position.toLowerCase()}`}>
                        {player.position}
                    </span>
                </p>
            </div>
        </div>

        <div className="stats">
        {player.position === "QB" && (
            <>
            <div className="stat-box">
                <h3>{player.passingYards.toLocaleString()}</h3>
                <p>Passing Yards</p>
            </div>

            <div className="stat-box">
                <h3>{player.passingTouchdowns}</h3>
                <p>Passing TDs</p>
            </div>

            <div className="stat-box">
                <h3>{player.interceptions}</h3>
                <p>Interceptions</p>
            </div>
            </>
        )}

        {player.position === "RB" && (
            <>
            <div className="stat-box">
                <h3>{player.rushingYards.toLocaleString()}</h3>
                <p>Rushing Yards</p>
            </div>

            <div className="stat-box">
                <h3>{player.rushingTouchdowns}</h3>
                <p>Rushing TDs</p>
            </div>

            <div className="stat-box">
                <h3>{player.receivingYards.toLocaleString()}</h3>
                <p>Receiving Yards</p>
            </div>

            <div className="stat-box">
                <h3>{player.receivingTouchdowns}</h3>
                <p>Receiving TDs</p>
            </div>
            </>
        )}

        {(player.position === "WR" || player.position === "TE") && (
            <>
            <div className="stat-box">
                <h3>{player.receivingYards.toLocaleString()}</h3>
                <p>Receiving Yards</p>
            </div>

            <div className="stat-box">
                <h3>{player.receivingTouchdowns}</h3>
                <p>Receiving TDs</p>
            </div>
            </>
        )}
        </div>

        <button
            className="compare-button"
            onClick={() => {
                console.log("Compare clicked:", player.name);
                onCompare(player);
            }}
        >
            Compare
        </button>
    </section>
    );
}

export default PlayerCard;