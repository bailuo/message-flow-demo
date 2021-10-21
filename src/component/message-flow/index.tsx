import { Fragment, useEffect, useState } from "react";
import Message from "../message";
import {
  IMessage,
  MessageFlowProps,
  MessageContentType,
  MessageSender,
} from "../../types";
import "./index.less";
import { DemoMessageQueue } from "../../utils/demoMessageQueue";

function MessageList(props: any) {
  const { currentUser, eventBus } = props;
  const [currentMessageList, setCurrentMessageList] = useState<Array<IMessage>>(
    []
  );
  const revokeMessage = (messageId: string) => {
    const timestamp = Date.now().toString();
    const sysMessage: IMessage = {
      id: `system-${timestamp}`,
      contentType: MessageContentType.TEXT,
      content: `User ${currentUser} withdrew a message`,
      timestamp,
      senderType: MessageSender.SYSTEM,
      senderId: "system",
    };
    DemoMessageQueue.removeMessageById(messageId);
    DemoMessageQueue.addMessage(sysMessage);
    eventBus.publish("ON_MESSAGE_LIST_UPDATE");
  };
  useEffect(() => {
    eventBus.subscribe("ON_MESSAGE_LIST_UPDATE", () => {
      setCurrentMessageList(DemoMessageQueue.messages.concat([]));
    });
  }, [eventBus, currentUser]);
  return (
    <Fragment>
      {currentMessageList.map((_message: IMessage) => (
        <Message
          revokeMessage={revokeMessage}
          currentUser={currentUser}
          message={_message}
          key={_message.id}
        />
      ))}
    </Fragment>
  );
}
export default function MessageFlow(props: MessageFlowProps) {
  return (
    <div className="message-flow">
      <MessageList {...props} />
    </div>
  );
}
