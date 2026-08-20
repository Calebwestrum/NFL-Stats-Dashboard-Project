function PlayerComparison({ players, onRemove }) {
    if (players.length === 0) {
        return null;
    }

    const firstPlayer = players[0];
    const secondPlayer = players[1];

    const stats = {
        QB: [
            ["Passing Yards", "passingYards"],
            ["Passing TDs", "passingTouchdowns"],
            ["Interceptions", "interceptions"],
        ],
        RB: [
            ["Rushing Yards", "rushingYards"],
            ["Rushing TDs", "rushingTouchdowns"],
            ["Receiving Yards", "receivingYards"],
            ["Receiving TDs", "receivingTouchdowns"],
        ],
        WR: [
            ["Receiving Yards", "receivingYards"],
            ["Receiving TDs", "receivingTouchdowns"],
        ],
        TE: [
            ["Receiving Yards", "receivingYards"],
            ["Receiving TDs", "receivingTouchdowns"],
        ],
    };

    const playerStats = stats[firstPlayer.position];

    return (
        <section className="player-comparison">
            <h2>Player Comparison</h2>

            <div className="comparison-header">
                <div></div>

                <div>
                    <h3>{firstPlayer.name}</h3>
                    <button onClick={() => onRemove(firstPlayer.id)}>
                        Remove
                    </button>
                </div>

                {secondPlayer && (
                    <div>
                        <h3>{secondPlayer.name}</h3>
                        <button onClick={() => onRemove(secondPlayer.id)}>
                            Remove
                        </button>
                    </div>
                )}
            </div>

            {playerStats.map(([label, stat]) => (
                <div className="comparison-row" key={stat}>
                    <p>{label}</p>

                    <p>
                        {firstPlayer[stat]?.toLocaleString() ?? "-"}
                    </p>

                    <p>
                        {secondPlayer
                            ? secondPlayer[stat]?.toLocaleString() ?? "-"
                            : "-"}
                    </p>
                </div>
            ))}
        </section>
    );
}

export default PlayerComparison;