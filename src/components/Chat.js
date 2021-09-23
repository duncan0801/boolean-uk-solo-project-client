import { useEffect } from "react";
import { useParams } from "react-router";
import useStore from "../store";
import "../styles/chat.css";

function MessageBubble({ userName, content }) {
	if (userName && content) {
		return (
			<div className="message-bubble">
				<p className="username">{userName}</p>
				<p className="message-content">{content}</p>
			</div>
		);
	}
}

function Chat() {
	const { lobbyId } = useParams();
	const messageTextField = useStore((state) => state.messageTextField);
	const setMessageTextField = useStore((state) => state.setMessageTextField);
	const postAMessage = useStore((state) => state.postAMessage);
	const messages = useStore((state) => state.messages);
	const lobbyUsers = useStore((state) => state.lobbyUsers);
	const fetchLobbyMessages = useStore((state) => state.fetchLobbyMessages);

	useEffect(() => {
		fetchLobbyMessages(lobbyId);
	}, []);

	function handleOnSubmit(event) {
		event.preventDefault();

		const userAsJSON = localStorage.getItem("user");
		const userName = JSON.parse(userAsJSON);

		const postBody = {
			userName: userName,
			lobbyId: lobbyId,
			content: messageTextField,
		};
		postAMessage(postBody).then((data) => {
			console.log("frontend", data);
		});
		//1. Post the message to the DB

		//2. If successful, update the message state
	}
	function handleOnChange(event) {
		setMessageTextField(event.target.value);
	}
	if (lobbyUsers && messages) {
		console.log("Messages from Chat:", messages);
		return (
			<section className="lobby-section chat-section">
				<div className="section-container">
					<h2>Chat</h2>
					<div className="messages-container">
						{messages
							? messages.map((message) => {
									const userForMessage = lobbyUsers.find(
										(user) => {
											return user.id === message.userId;
										}
									);
									console.log(
										"userForMessage:",
										userForMessage
									);
									return (
										<MessageBubble
											userName={userForMessage.userName}
											content={message.content}
										/>
									);
							  })
							: null}
					</div>
					<form onSubmit={handleOnSubmit}>
						<textarea
							placeholder="write a message..."
							onChange={handleOnChange}
							value={messageTextField}
						></textarea>
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<path
									fill="#B93E67"
									d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
								></path>
							</svg>
						</button>
					</form>
				</div>
			</section>
		);
	}
	return <h2>Loading...</h2>;
}

export default Chat;
