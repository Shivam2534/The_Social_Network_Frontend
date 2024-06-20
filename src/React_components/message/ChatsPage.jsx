import { PrettyChatWindow } from "react-chat-engine-pretty";
import { CHAT_API_KEY } from "../../../constant.js";

const ChatsPage = (props) => {
  return (
    <div className="background">
      <PrettyChatWindow
        projectId={CHAT_API_KEY}
        username={props.user.username}
        secret={props.user.secret}
      />
    </div>
  );
};

export default ChatsPage;
