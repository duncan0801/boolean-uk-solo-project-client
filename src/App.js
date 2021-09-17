import "./App.css";
import HomePage from "./pages/HomePage";
import socketClient from "socket.io-client";
const SERVER = "http://localhost:8000";

function App() {
	const socket = socketClient(SERVER);

	socket.on("connection", () => {
		console.log("I'm connected to the back end");
	});
	return (
		<main>
			<HomePage />
		</main>
	);
}

export default App;
