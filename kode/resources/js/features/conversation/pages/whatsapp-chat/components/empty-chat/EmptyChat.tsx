import type React from "react";


const EmptyChat: React.FC = () => {
    return (
        <div className="col empty-chat">
            <div className="empty-chat-content">
                <div className="message-icon-animation">
                    <div class="message-icon chat-animate">
                        <i>
                            <i></i>
                            <i></i>
                        </i>
                        <i>
                            <i></i>
                            <i></i>
                        </i>
                        <i>
                            <i></i>
                            <i></i>
                        </i>
                        <i>
                            <i></i>
                            <i></i>
                        </i>
                    </div>
                </div>

                <div>
                    <h4 className="mb-1">Welcome to the conversation!</h4>
                    <p>
                        You haven't started chatting yet. Select a user to begin
                        your conversation.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EmptyChat