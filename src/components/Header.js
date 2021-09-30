import "../styles/header.css";
const { useHistory } = require("react-router-dom");

function Header() {
	const history = useHistory();
	function handleOnClick() {
		localStorage.removeItem("token");
		history.push("/");
	}
	return (
		<header>
			<h1>Social Game Lobby</h1>
			<button onClick={handleOnClick}>Log Out</button>
		</header>
	);
}
export default Header;
