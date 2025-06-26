import { BsEmojiSmileFill } from "react-icons/bs";
import { LuPaperclip, LuSendHorizontal } from "react-icons/lu";
import Button from "../../../../../../components/common/button/Button";

const ChatComposer: React.FC = ({ type }) => {
  return (
    <div className="chat-body-footer">
      <form action="#" className="d-flex align-items-center gap-3 w-100">

        {type === "sms" && (
          <div className="d-flex align-items-center gap-3 flex-shrink-0">
            <Button className="bg--transparent text-muted fs-20 lh-1">
              <LuPaperclip />
            </Button>
          </div>
        )}

        <input
          type="text"
          placeholder="Write a message…"
          className="w-100 border-0 py-1 bg--transparent flex-grow-1"
        />

        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          {type === "sms" && (
            <Button
              type="button"
              className="bg--transparent text-warning fs-18 lh-1"
            >
              <BsEmojiSmileFill />
            </Button>
          )}


          <Button
            iconBtn={true}
            tooltipText="Send"
            type="submit"
            icon={LuSendHorizontal}
            className="primary-solid btn-sm circle fs-18"
          />

        </div>
      </form>
    </div>
  );
};

export default ChatComposer;
