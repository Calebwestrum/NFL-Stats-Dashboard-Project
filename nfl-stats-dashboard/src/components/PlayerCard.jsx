import joshAllen from "../assets/players/josh-allen.jpg";
import bijanRobinson from "../assets/players/bijan-robinson.jpg";
import justinJefferson from "../assets/players/justin-jefferson.jpg";
import treyMcBride from "../assets/players/trey-mcbride.jpg";

import billsLogo from "../assets/teams/bills.png";
import falconsLogo from "../assets/teams/falcons.png";
import vikingsLogo from "../assets/teams/vikings.png";
import cardinalsLogo from "../assets/teams/cardinals.png";

const playerImages = {
    "josh-allen.jpg": joshAllen,
    "bijan-robinson.jpg": bijanRobinson,
    "justin-jefferson.jpg": justinJefferson,
    "trey-mcbride.jpg": treyMcBride,
};

const teamLogos = {
    "bills.png": billsLogo,
    "falcons.png": falconsLogo,
    "vikings.png": vikingsLogo,
    "cardinals.png": cardinalsLogo,
};

function PlayerCard({player}){
    return(
    <section className={`player-card ${player.position.toLowerCase()}`}>
        <div className="player-header">
            {player.image && (
                <img
                    src={playerImages[player.image]}
                    alt={player.name}
                    className="player-image"
                />
            )}
            <div>
                <h2>{player.name}</h2>
                <p>
                    {player.logo && (
                        <img
                            src={teamLogos[player.logo]}
                            alt={`${player.team} logo`}
                            className="team-logo"
                        />
                    )}
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
    </section>
    );
}

export default PlayerCard;