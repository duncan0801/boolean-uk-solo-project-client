import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import LobbyLibrary from "./pages/LobbyLibrary";
import useStore from "./store";
import NotAuthorized from "./pages/NotAuthorized";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
const backendURL = process.env.REACT_APP_BACKEND_API_URL
const SERVER = backendURL;


function App() {
	const authenticatedUser = useStore((state) => state.authenticatedUser);
	const setAuthenticatedUser = useStore(
		(state) => state.setAuthenticatedUser
	);
	
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
