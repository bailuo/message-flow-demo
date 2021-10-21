import type { IMessage } from "../types";

class DemoMessages {
  private DemoMessageArray: Array<IMessage>;
  constructor() {
    this.DemoMessageArray = [];
  }

  get messages() {
    return this.DemoMessageArray;
  }

  addMessage(message: IMessage) {
    this.DemoMessageArray.push(message);
  }

  removeMessageById(messageId: string) {
    this.DemoMessageArray = this.DemoMessageArray.filter((_message) => {
      return _message.id !== messageId;
    });
  }
  removeMessage(message: IMessage) {
    this.removeMessageById(message.id);
  }
}

export const DemoMessageQueue = new DemoMessages();
