import { IMessage, MessageContentType } from "../../types";

export function UserMessage(props: IMessage) {
  const { content, contentType } = props;
  if (contentType === MessageContentType.IMAGE) {
    return <img src="../../../../img3.jpeg" alt="mocked message of" />;
  }
  return <div className="message__user">{content}</div>;
}
