import { useEffect } from "react";
import Chat from "../components/Chat";
import Games from "../components/Games";
import Players from "../components/Players";
import useStore from "../store";
import "../styles/lobbyPage.css";

function LobbyPage() {
	const setUsers = useStore((state) => state.setUsers);
	useEffect(() => {
		fetch(`http://localhost:8000/users`)
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);
	return (
		<div className="lobby-container">
			<Players />
			<Games />
			<Chat />
		</div>
	);
}
export default LobbyPage;
