import "./App.css";
import HomePage from "./pages/HomePage";
import socketClient from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import LobbyLibrary from "./pages/LobbyLibrary";
import useStore from "./store";
import NotAuthorized from "./pages/NotAuthorized";
const { v4: uuidv4 } = require("uuid");
const SERVER = "http://localhost:8000";

export const socket = socketClient(SERVER);

function App() {
	const authenticatedUser = useStore((state) => state.authenticatedUser);
	const setAuthenticatedUser = useStore(
		(state) => state.setAuthenticatedUser
	);
	// socket.on("connection", (socket) => {
	// 	console.log(`I'm connected to the back end. Socket ID: ${socket.id}`);
	// });

	// socket.emit("test", "blah", 10, () => {});
	// socket.on("received-test", (message) => {
	// 	console.log(message);
	// });
	// // socket.join(uuidv4());
	const user = localStorage.getItem("user");

	if (user) {
		setAuthenticatedUser(user);
	}

	return (
		<main>
			<Router>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route exact path="/lobbies">
						{authenticatedUser ? (
							<LobbyLibrary />
						) : (
							<NotAuthorized />
						)}
					</Route>
					<Route exact path="/lobby/:lobbyId">
						{authenticatedUser ? <LobbyPage /> : <NotAuthorized />}
					</Route>
				</Switch>
			</Router>
		</main>
	);
}

export default App;
