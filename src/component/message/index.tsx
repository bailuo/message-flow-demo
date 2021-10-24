import { MessageSender } from "../../types";
import { SystemMessage } from "./system-message";
import { UserMessage } from "./user-message";
import "./index.less";

function MessageWrap(props: any) {
  const { messageType } = props;
  return (
    <div className={`message-wrap message-wrap__${messageType}`}>
      {props.children}
    </div>
  );
}
function Message(props: any) {
  const { currentUser, message } = props;
  const MessageRevoke = () => (
    <span
      className="message-action__revoke"
      onClick={() => {
        props.revokeMessage && props.revokeMessage(message.id);
      }}
    >
      Revoke
    </span>
  );
  if (message.senderType === MessageSender.SYSTEM) {
    return (
      <MessageWrap messageType="system">
        <SystemMessage {...message} />
      </MessageWrap>
    );
  }
  if (message.senderId && message.senderId === currentUser) {
    return (
      <MessageWrap messageType="current-user">
        <MessageRevoke />
        <UserMessage {...message} />
      </MessageWrap>
    );
  }
  return (
    <MessageWrap messageType="other-user">
      <UserMessage {...message} />
    </MessageWrap>
  );
}

export default Message;
