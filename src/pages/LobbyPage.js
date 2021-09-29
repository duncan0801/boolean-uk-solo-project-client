import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";
import Games from "../components/Games";
import LeaveLobbyModal from "../components/LeaveLobbyModal";
import LobbyTitle from "../components/LobbyTitle";
import Players from "../components/Players";
import useStore from "../store";
import "../styles/lobbyPage.css";

function LobbyPage() {
	const history = useHistory();
	const { lobbyId } = useParams();
	const fetchLobbyById = useStore((state) => state.fetchLobbyById);
	const setTabIndex = useStore((state) => state.setTabIndex);
	const setRequestedLobbyId = useStore((state) => state.setRequestedLobbyId);
	const leaveModal = useStore((state) => state.leaveModal);

	const localToken = localStorage.getItem("token");

	useEffect(() => {
		console.log(lobbyId);
		fetchLobbyById(lobbyId);
	}, []);

	function handleRedirectToLobbyPage() {
		setRequestedLobbyId(lobbyId);
		setTabIndex(2);

		history.push("/");
	}

	if (!localToken) {
		return (
			<>
				<h1>
					Sorry, you need to join the lobby first before you can
					access it
				</h1>
				{/* 
            // 1. Set the value fo the lobbyId text field to the lobbyId
            // 2. Set the value of tabIndex to 2
            // 3. Push to the homepage 
            */}
				<button onClick={handleRedirectToLobbyPage}>
					Go to join a lobby page
				</button>
			</>
		);
	}

	// fetch Lobby here and set all the state for players and lobbyId
	return (
		<>
			<div className="lobby-container">
				<LobbyTitle />
				<Players />
				<Games />
				<Chat />
			</div>
			{leaveModal ? <LeaveLobbyModal /> : null}
		</>
	);
}
export default LobbyPage;
