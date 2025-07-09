import type React from "react";
import SpinnerLoader from "../../../../../../components/common/loader/SpinnerLoader";


const ChatLoader: React.FC = () => {
    return (
        <div className="col chat-loader">
            <SpinnerLoader size={"lg"} />
        </div>
    );
}

export default ChatLoader;