import { useHistory, useParams } from "react-router";
import useStore from "../store";
import "../styles/leaveLobbyModal.css";

function LeaveLobbyModal() {
	const history = useHistory();
	const setLeaveModal = useStore((state) => state.setLeaveModal);
	const lobbyId = useStore((state) => state.lobbyId);
	const removeUserFromLobby = useStore((state) => state.removeUserFromLobby);
	const authenticatedUser = useStore((state) => state.authenticatedUser);

	function handleLeaveOnClick() {
		// 2. On confirmation of leave lobby, delete the user from the database
		removeUserFromLobby(lobbyId, authenticatedUser.id).then(
			(deletedUserOnLobby) => {
				if (deletedUserOnLobby) {
					setLeaveModal(false);
					history.push("/lobby-library");
				} else {
					setLeaveModal(false);
					alert("Remove user unsuccessful");
				}
			}
		);
		// 3. redirect to the home page
	}

	function handleStayOnClick() {
		setLeaveModal(false);
	}
	return (
		<div className="background">
			<div className="modal">
				<p>Are you sure you want to leave?</p>
				<p>You will have to join the lobby again if you wish to</p>
				<div className="button-container">
					<button
						className="leave-button"
						onClick={handleLeaveOnClick}
					>
						Leave
					</button>
					<button className="stay-button" onClick={handleStayOnClick}>
						Stay
					</button>
				</div>
			</div>
		</div>
	);
}

export default LeaveLobbyModal;
