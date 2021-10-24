import { useState, useEffect } from "react";
import "./index.less";
function MockBar(props: any) {
  const { eventBus, members } = props;
  const [currentUser, setCurrentUser] = useState<string | null>("A");
  useEffect(() => {
    eventBus.subscribe("ON_MEMBER_CHANGE", (member: string) => {
      setCurrentUser(member);
    });
  }, [eventBus]);
  const currentMembers = members.map((_member: string) => (
    <div key={_member}>
      <input
        type="radio"
        value={_member}
        checked={_member === currentUser}
        name="member"
        onChange={(e: any) => {
          eventBus.publish("ON_MEMBER_CHANGE", e.target.value);
        }}
      />
      {_member}
    </div>
  ));

  return (
    <div className="mock-bar">
      <div className="quick-actions">
        <span>Current User List</span>
      </div>
      <div className="mock-user-list">{currentMembers}</div>
    </div>
  );
}

export default MockBar;
