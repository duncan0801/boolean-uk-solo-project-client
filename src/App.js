import "./App.css";
import HomePage from "./pages/HomePage";
import socketClient from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
const SERVER = "http://localhost:8000";

function App() {
	const socket = socketClient(SERVER);

	socket.on("connection", (socket) => {
		console.log(`I'm connected to the back end. Socket ID: ${socket.id}`);
	});
	return (
		<main>
			<Router>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route exact path="/lobby">
						<LobbyPage />
					</Route>
				</Switch>
			</Router>
		</main>
	);
}

export default App;
