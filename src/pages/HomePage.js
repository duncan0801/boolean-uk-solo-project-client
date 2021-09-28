import AnonymousLogin from "../components/AnonymousLogin";
import JoinARoom from "../components/JoinARoom";
import AuthenticatedLogin from "../components/JoinARoom";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import useStore from "../store";
import "../styles/homePage.css";

function HomePage() {
	const tabIndex = useStore((state) => state.tabIndex);
	const setTabIndex = useStore((state) => state.setTabIndex);
	return (
		<section className="home-page">
			<div className="container">
				<div className="tabs">
					<ul>
						<li
							className={
								tabIndex === 1 ? "active-tab" : "inactive-tab left"
							}
							onClick={() => setTabIndex(1)}
						>
							Sign Up
						</li>
						<li
							className={
								tabIndex === 2 ? "active-tab" : "inactive-tab right"
							}
							onClick={() => setTabIndex(2)}
						>
							Log In
						</li>
					</ul>
				</div>
				{}
				<div className="tab-content">
					<div
						className={
							tabIndex === 1
								? "active-content anonymous-login"
								: "content anonymous-login"
						}
					>
						{/* <AnonymousLogin /> */}
						<SignUp />
					</div>
					<div
						className={
							tabIndex === 2
								? "active-content authenticated-login"
								: "content authenticated-login"
						}
					>
						{/* <JoinARoom /> */}
						<LogIn />
					</div>
				</div>
			</div>
		</section>
	);
}

export default HomePage;
