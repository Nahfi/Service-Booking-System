import { BsEmojiSmileFill, BsMic } from "react-icons/bs";
import { LuPaperclip, LuSendHorizontal } from "react-icons/lu";

const ChatComposer = () => {
  return (
    <div className="chat-body-footer">
      <form action="#" className="d-flex align-items-center gap-3 w-100">
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          <button className="bg--transparent text-muted fs-20 lh-1">
            <LuPaperclip />
          </button>

          <button className="bg--transparent text-muted fs-20 lh-1">
            <BsMic />
          </button>
        </div>

        <input
          type="text"
          placeholder="Write a message…"
          className="w-100 border-0 py-1 bg--transparent"
        />

        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          <button
            type="button"
            className="bg--transparent text-warning fs-20 lh-1"
          >
            <BsEmojiSmileFill />
          </button>

          <button
            className="icon-btn primary-solid btn-sm  circle fs-18"
            type="submit"
          >
            <LuSendHorizontal  />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComposer;
