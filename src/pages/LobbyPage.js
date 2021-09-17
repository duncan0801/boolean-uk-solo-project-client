import Chat from "../components/Chat";
import Games from "../components/Games";
import Players from "../components/Players";
import "../styles/lobbyPage.css";

function LobbyPage() {
	return (
		<div className="lobby-container">
			<Players />
			<Games />
			<Chat />
		</div>
	);
}
export default LobbyPage;
