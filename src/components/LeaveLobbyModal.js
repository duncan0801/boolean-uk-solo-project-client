import { useHistory } from "react-router";
import useStore from "../store";
import "../styles/leaveLobbyModal.css";

function LeaveLobbyModal() {
	const setLeaveModal = useStore((state) => state.setLeaveModal);

	function handleLeaveOnClick() {
		// 2. On confirmation of leave lobby, delete the user from the database
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
					<button className="leave-button">Leave</button>
					<button className="stay-button" onClick={handleStayOnClick}>
						Stay
					</button>
				</div>
			</div>
		</div>
	);
}

export default LeaveLobbyModal;
