import { useEffect } from "react";
import useStore from "../store";
import { baseURL } from "../globals";

function LobbyTitle() {
	const lobbyId = useStore((state) => state.lobbyId);
	const setLeaveModal = useStore((state) => state.setLeaveModal);

	function handleGetLobbyLinkOnClick() {
		const link = `htttp://localhost:3000/${lobbyId}`;
		navigator.clipboard.writeText(`htttp://localhost:3000/${lobbyId}`);
		alert(`${link} copied to clipboard`);
	}

	function handleLeaveLobbyOnClick() {
		// 1. Render a are you sure you want to leave the lobby modal
		setLeaveModal(true);
	}
	if (lobbyId) {
		return (
			<section className="lobby-title-section">
				<h1>Lobby Id: {lobbyId}</h1>
				<div>
					<button
						className="get-lobby-link"
						onClick={handleGetLobbyLinkOnClick}
					>
						Copy Lobby Link
					</button>
					<button
						className="leave-lobby"
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
