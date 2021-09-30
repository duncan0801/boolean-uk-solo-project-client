import "./App.css";
import HomePage from "./pages/HomePage";
// import socketClient from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import LobbyLibrary from "./pages/LobbyLibrary";
import useStore from "./store";
import NotAuthorized from "./pages/NotAuthorized";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
const backendURL = process.env.REACT_APP_BACKEND_API_URL
const SERVER = backendURL;

// export const socket = socketClient(SERVER);

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
	useEffect(() => {
		if (authenticatedUser) return;

		const token = localStorage.getItem("token");
		if (token) {
			const user = jwtDecode(token);
			if (user) {
				setAuthenticatedUser(user);
			}
		}
	}, []);

	return (
		<main>
			<Router>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route exact path="/lobby-library">
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
