import { useState } from "react";
import { memberList } from "../../utils/configConstants";
import { IMessage, MessageContentType, MessageSender } from "../../types";
import { DemoMessageQueue } from "../../utils/demoMessageQueue";

import "./index.less";
function MockBar(props: any) {
  const [members, setMemebers] = useState<Array<string>>(["A"]);
  const { eventBus } = props;

  const addMember = () => {
    const currentMembersCount = members.length;
    if (currentMembersCount >= memberList.length) {
      return;
    }
    const updatedMemebers = memberList
      .concat([])
      .slice(0, currentMembersCount + 1);
    const thisInvite = updatedMemebers[updatedMemebers.length - 1];
    setMemebers(updatedMemebers);
    const timestamp = Date.now().toString();
    const message: IMessage = {
      id: `system-${timestamp}`,
      contentType: MessageContentType.TEXT,
      content: `System Invite user ${thisInvite} into this chat`,
      timestamp,
      senderType: MessageSender.SYSTEM,
      senderId: "system",
    };
    DemoMessageQueue.addMessage(message);
    eventBus.publish("ON_MESSAGE_LIST_UPDATE");
  };
  const currentMembers = members.map((_member: string) => (
    <div key={_member}>
      <input
        type="radio"
        value={_member}
        name="member"
        onClick={(e: any) => {
          eventBus.publish("ON_MEMBER_CHANGE", e.target.value);
        }}
      />
      {_member}
    </div>
  ));

  return (
    <div className="mock-bar">
      <div className="quick-actions">
        <button className="quick-action" onClick={addMember}>
          Invite New Member
        </button>
      </div>
      <div className="mock-user-list">{currentMembers}</div>
    </div>
  );
}

export default MockBar;
