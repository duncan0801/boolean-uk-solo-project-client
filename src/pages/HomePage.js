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
							className={tabIndex === 1 ? "active-tab" : ""}
							onClick={() => setTabIndex(1)}
						>
							Anonymous login
						</li>
						<li
							className={tabIndex === 2 ? "active-tab" : ""}
							onClick={() => setTabIndex(2)}
						>
							Authenticated login
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
						<h2>Anonymous Login</h2>
					</div>
					<div
						className={
							tabIndex === 2
								? "active-content authenticated-login"
								: "content authenticated-login"
						}
					>
						<h2>Authenticated Login</h2>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HomePage;
