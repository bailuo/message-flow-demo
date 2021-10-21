export enum MessageContentType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  //   EMOJI = "EMOJI",
}
export enum MessageSender {
  SYSTEM = "SYSTEM",
  USER = "USER",
}
interface IUser {
  id: string;
  name?: string;
}
export interface IMessage {
  id: string;
  contentType: MessageContentType;
  content?: any;
  timestamp: string;
  senderType: MessageSender;
  senderId?: string;
}

export interface IChatRoom {
  id: string;
  roomUsers: Array<IUser>;
  messages?: Array<IMessage> | null;
}

export interface IChat {
  rooms: Array<IChatRoom>;
}

export type MessageFlowProps = {
  messages?: Array<IMessage> | null;
  currentUser: string | null;
  eventBus?: any;
};
