import { useEffect } from "react";
import { useParams } from "react-router";
import Chat from "../components/Chat";
import Games from "../components/Games";
import LobbyTitle from "../components/LobbyTitle";
import Players from "../components/Players";
import useStore from "../store";
import "../styles/lobbyPage.css";

function LobbyPage() {
	const { lobbyId } = useParams();
	const fetchLobbyById = useStore((state) => state.fetchLobbyById);
	const setLobbyUsers = useStore((state) => state.setLobbyUsers);
	const lobbyUsers = useStore((state) => state.lobbyUsers);

	// fetch Lobby here and set all the state for players and lobbyId
	useEffect(() => {
		fetchLobbyById(lobbyId).then((lobby) => {
			setLobbyUsers(lobby.users);
			if (lobbyUsers) {
				console.log("Lobby Users:", lobbyUsers);
			}
		});
	}, []);
	return (
		<>
			<div className="lobby-container">
				<LobbyTitle />
				<Players />
				<Games />
				<Chat />
			</div>
		</>
	);
}
export default LobbyPage;
