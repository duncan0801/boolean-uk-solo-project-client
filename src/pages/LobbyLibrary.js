import "../styles/lobbyLibrary.css";
import { Link } from "react-router-dom";
import JoinLobbyModal from "../components/JoinLobbyModal";
import useStore from "../store";

function LobbySlot() {
	return (
		<Link className="lobby-slot">
			<p>LobbyId:</p>
		</Link>
	);
}

function LobbyLibrary() {
	const requestedLobbyId = useStore((state) => state.requestedLobbyId);
	const setRequestedLobbyId = useStore((state) => state.setRequestedLobbyId);

	return (
		<>
			<div className="lobby-library-container">
				<div className="section-container">
					<h2>Lobby Library</h2>
					<div className="lobby-slot-container">
						<LobbySlot />
					</div>
					<div className="buttons-container">
						<button>Create New Lobby</button>
						<form className="join-lobby-form">
							<input
								type="text"
								placeholder="LobbyId"
								value={requestedLobbyId}
								onChange={(event) =>
									setRequestedLobbyId(event.target.value)
								}
							/>
							<button>Join Lobby</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default LobbyLibrary;
