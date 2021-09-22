import MessageBubble from "./MessageBubble";

function Chat() {
	return (
		<section className="lobby-section chat-section">
			<div className="section-container">
				<h2>Chat</h2>
                <div className="section-container">
                    <MessageBubble/>
                </div>
			</div>
		</section>
	);
}

export default Chat;
