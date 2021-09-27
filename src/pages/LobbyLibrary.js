import "../styles/lobbyLibrary.css";
import { Link } from "react-router-dom";

function LobbySlot() {
	return (
		<Link className="lobby-slot">
			<p>LobbyId:</p>
		</Link>
	);
}

function LobbyLibrary() {
	return (
		<div className="lobby-library-container">
			<div className="section-container">
				<h2>Lobby Library</h2>
				<div className="lobby-slot-container">
					<LobbySlot />
				</div>
			</div>
		</div>
	);
}

export default LobbyLibrary;
