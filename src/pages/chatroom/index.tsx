import { useEffect, useState } from "react";
import MessageFlow from "../../component/message-flow";
import UserActionBar from "../../component/user-action-bar";
import "./index.less";
function Chat(props: any) {
  const [currentUser, setCurrentUser] = useState<string | null>("A");
  const { eventBus, members } = props;
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
        <UserActionBar
          currentUser={currentUser}
          eventBus={eventBus}
          members={members}
        />
      </main>
    </div>
  );
}

export default Chat;
