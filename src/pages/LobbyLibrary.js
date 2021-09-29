import "../styles/lobbyLibrary.css";
import { Link } from "react-router-dom";
import JoinLobbyModal from "../components/JoinLobbyModal";
import useStore from "../store";
import { useEffect } from "react";

function LobbySlot({ lobby }) {
	return (
		<Link to={`/${lobby.id}`}>
			<div className="lobby-slot">
				<p>Lobby Name: {lobby.name}</p>
			</div>
		</Link>
	);
}

function LobbyLibrary() {
	const requestedLobbyId = useStore((state) => state.requestedLobbyId);
	const setRequestedLobbyId = useStore((state) => state.setRequestedLobbyId);
	const getUserById = useStore((state) => state.getUserById);
	const authenticatedUser = useStore((state) => state.authenticatedUser);
	const userLobbies = useStore((state) => state.userLobbies);
	const fetchLobbiesByUserId = useStore(
		(state) => state.fetchLobbiesByUserId
	);

	useEffect(() => {
		console.log("authenticatedUser", authenticatedUser);
		fetchLobbiesByUserId();
	}, [authenticatedUser]);

	if (!userLobbies) {
		return <h1>Loading...</h1>;
	}
	function handleOnSubmit(event) {
        
    }
	return (
		<>
			<div className="lobby-library-container">
				<div className="section-container">
					<h2>Lobby Library</h2>
					<div className="lobby-slot-container">
						{userLobbies.map((lobby) => {
							return <LobbySlot lobby={lobby} />;
						})}
					</div>
					<div className="buttons-container">
						<button>Create New Lobby</button>
						<form
							onSubmit={handleOnSubmit}
							className="join-lobby-form"
						>
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
