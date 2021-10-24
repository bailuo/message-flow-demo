import { useState } from "react";
import { DemoMessageQueue } from "../../utils/demoMessageQueue";
import { MessageContentType, IMessage, MessageSender } from "../../types";
import { memberList } from "../../utils/configConstants";
export default function UserActionBar(props: any) {
  const { currentUser, eventBus, members } = props;
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const onMessageSend = () => {
    if (!currentUser) {
      return;
    }
    const currentTime = Date.now().toString();
    const message: IMessage = {
      id: currentUser + currentTime,
      contentType: MessageContentType.TEXT,
      content: currentMessage,
      timestamp: currentTime,
      senderType: MessageSender.USER,
      senderId: currentUser,
    };
    DemoMessageQueue.addMessage(message);
    setCurrentMessage("");
    eventBus.publish("ON_MESSAGE_LIST_UPDATE");
  };
  const onImageSend = () => {
    if (!currentUser) {
      return;
    }
    const currentTime = Date.now().toString();
    const message: IMessage = {
      id: currentUser + currentTime,
      contentType: MessageContentType.IMAGE,
      timestamp: currentTime,
      senderType: MessageSender.USER,
      senderId: currentUser,
    };
    DemoMessageQueue.addMessage(message);
    eventBus.publish("ON_MESSAGE_LIST_UPDATE");
  };
  const onInvite = () => {
    // assume we invite next member on the list
    const thisInvite = memberList[members.length];
    const timestamp = Date.now().toString();
    const message: IMessage = {
      id: `${currentUser}-${timestamp}`,
      contentType: MessageContentType.TEXT,
      content: `User ${currentUser} Invite user ${thisInvite} into this chat`,
      timestamp,
      senderType: MessageSender.SYSTEM,
      senderId: currentUser,
    };
    DemoMessageQueue.addMessage(message);
    eventBus.publish("ON_MESSAGE_LIST_UPDATE");
    eventBus.publish("ON_MEMBER_ADD", currentUser);
  };
  return (
    <div className="chat-actions">
      <input
        className="chat-input"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button className="send-btn" onClick={onMessageSend}>
        Send
      </button>
      <button className="img-btn" onClick={onImageSend}>
        Image
      </button>
      <button className="invite-btn" onClick={onInvite}>
        Invite
      </button>
    </div>
  );
}
