import { useEffect } from "react";
import useStore from "../store";
import { baseURL } from "../globals";
const reactAppURL = process.env.REACT_APP_API_URL;
function LobbyTitle() {
	const lobbyId = useStore((state) => state.lobbyId);
	const setLeaveModal = useStore((state) => state.setLeaveModal);
	const removeUserFromLobby = useStore((state) => state.removeUserFromLobby);

	function handleGetLobbyIdOnClick() {
		// const link = `htttp://localhost:3000/${lobbyId}`;
		navigator.clipboard.writeText(lobbyId);
		alert(`${lobbyId} copied to clipboard`);
	}

	function handleLeaveLobbyOnClick() {
		// 1. Render a are you sure you want to leave the lobby modal
		removeUserFromLobby();
		setLeaveModal(true);
	}
	if (lobbyId) {
		return (
			<section className="lobby-title-section lobby-id-title">
				<div className="button-container">
					<button
						className="title-buttons get-lobby-link"
						onClick={handleGetLobbyIdOnClick}
					>
						Copy Lobby ID
					</button>
					<button
						className="title-buttons leave-lobby"
						onClick={handleLeaveLobbyOnClick}
					>
						Leave Lobby
					</button>
				</div>
			</section>
		);
	}
	return <h2>Loading...</h2>;
}

export default LobbyTitle;
