import Chat from "./pages/chatroom";
import MockBar from "./component/mockbar";
import eventBus from "./utils/EventBus";
import { useState, useEffect } from "react";
import { memberList } from "./utils/configConstants";
import "./App.less";
function App() {
  const [members, setMemebers] = useState<Array<string>>(["A"]);
  const currentMembersCount = members.length;
  useEffect(() => {
    eventBus.subscribe("ON_MEMBER_ADD", () => {
      // cannot exceed maximum number of member count
      if (currentMembersCount >= memberList.length) {
        return;
      }
      const updatedMemebers = memberList
        .concat([])
        .slice(0, currentMembersCount + 1);
      setMemebers(updatedMemebers);
    });
  }, [currentMembersCount]);
  return (
    <div className="App">
      <MockBar eventBus={eventBus} members={members} />
      <Chat eventBus={eventBus} members={members} />
    </div>
  );
}

export default App;
