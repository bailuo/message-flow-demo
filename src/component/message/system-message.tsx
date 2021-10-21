import { IMessage } from "../../types";

export function SystemMessage(props: IMessage) {
  return <div className="message__system">{props.content}</div>;
}
