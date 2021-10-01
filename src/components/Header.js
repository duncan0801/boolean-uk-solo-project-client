import "../styles/header.css";
const { useHistory, Link } = require("react-router-dom");

function Header() {
	const history = useHistory();
	function handleOnClick() {
		localStorage.removeItem("token");
		history.push("/");
	}
	return (
		<header>
			<h1>Social Game Lobby</h1>
			<Link to="/lobby-library">My Lobby Library</Link>
			<button className="logout-button" onClick={handleOnClick}>Log Out</button>
		</header>
	);
}
export default Header;
