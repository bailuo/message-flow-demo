import { useEffect, useState } from "react";
import MessageFlow from "../../component/message-flow";
import UserActionBar from "../../component/user-action-bar";
function Chat(props: any) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { eventBus } = props;
  useEffect(() => {
    eventBus.subscribe("ON_MEMBER_CHANGE", (member: string) => {
      setCurrentUser(member);
    });
  }, [eventBus]);
  return (
    <div className="page__chat">
      <header className="chat-header">Chat Demo</header>
      <main className="chat-main">
        <div className="chat-messages">
          <MessageFlow currentUser={currentUser} eventBus={eventBus} />
        </div>
        <UserActionBar currentUser={currentUser} eventBus={eventBus} />
      </main>
    </div>
  );
}

export default Chat;
