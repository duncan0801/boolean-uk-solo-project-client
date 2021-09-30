import "../styles/lobbyLibrary.css";
import { Link } from "react-router-dom";
import JoinLobbyModal from "../components/JoinLobbyModal";
import useStore from "../store";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
const { v4: uuidv4 } = require("uuid");

function LobbySlot({ lobby }) {
	return (
		<Link to={`lobby/${lobby.id}`}>
			<div className="lobby-slot">
				<p>Lobby Name: {lobby.name}</p>
			</div>
		</Link>
	);
}

function LobbyLibrary() {
	const history = useHistory();
	const requestedLobbyId = useStore((state) => state.requestedLobbyId);
	const setRequestedLobbyId = useStore((state) => state.setRequestedLobbyId);
	const authenticatedUser = useStore((state) => state.authenticatedUser);
	const userLobbies = useStore((state) => state.userLobbies);
	const createLobby = useStore((state) => state.createLobby);
	const requestedLobbyName = useStore((state) => state.requestedLobbyName);
	const addUserToLobby = useStore((state) => state.addUserToLobby);
	const setRequestedLobbyName = useStore(
		(state) => state.setRequestedLobbyName
	);
	const fetchLobbiesByUserId = useStore(
		(state) => state.fetchLobbiesByUserId
	);

	useEffect(() => {
		fetchLobbiesByUserId();
	}, [authenticatedUser]);

	if (!userLobbies) {
		return <h1>Loading...</h1>;
	}
	function handleCreateLobbyOnSubmit(event) {
		event.preventDefault();

		const body = {
			lobbyId: uuidv4(),
			lobbyName: requestedLobbyName,
		};
		createLobby(body).then((lobby) => {
			if (lobby) {
				console.log("lobby: ", lobby);
				history.push(`/lobby/${lobby.id}`);
			} else {
				alert("lobby could not be created");
			}
		});
	}
	function handleJoinLobbyOnSubmit(event) {
		event.preventDefault();

		const lobbyId = requestedLobbyId;
		const userId = authenticatedUser.id;

		addUserToLobby(userId, lobbyId).then((userOnLobby) => {
			history.push(`/lobby/${userOnLobby.lobbyId}`);
		});
	}
	return (
		<>
			<Header />
			<div className="lobby-library-container">
				<div className="section-container">
					<h2>Lobby Library</h2>
					<div className="lobby-slot-container">
						{userLobbies.map((lobby) => {
							return <LobbySlot key={lobby.name} lobby={lobby} />;
						})}
					</div>
					<div className="buttons-container">
						<form
							className="create-lobby-form"
							onSubmit={handleCreateLobbyOnSubmit}
						>
							<input
								type="text"
								placeholder="Lobby Name"
								value={requestedLobbyName}
								onChange={(event) =>
									setRequestedLobbyName(event.target.value)
								}
							/>
							<button>Create New Lobby</button>
						</form>

						<form
							onSubmit={handleJoinLobbyOnSubmit}
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
