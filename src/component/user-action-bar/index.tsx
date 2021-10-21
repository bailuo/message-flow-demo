import { useState } from "react";
import { DemoMessageQueue } from "../../utils/demoMessageQueue";
import { MessageContentType, IMessage, MessageSender } from "../../types";
export default function UserActionBar(props: any) {
  const { currentUser, eventBus } = props;
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
    </div>
  );
}
