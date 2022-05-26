export interface Message{
  content: string,
  author: string,
  imageLinks: string[],
  time: Date,
  channelKey: string,
  key: string
}

export class Message {
  content!: string;
  author!: string;
  imageLinks!: string[];
  time!: Date;
  channelKey!: string;
  key!: string;

  constructor(messageJSON: Message){
    this.content = messageJSON ? messageJSON.content : '';
    this.author = messageJSON ? messageJSON.author : '';
    this.imageLinks = messageJSON ? messageJSON.imageLinks : [];
    this.time = messageJSON ? new Date(messageJSON.time) : new Date();
    this.channelKey = messageJSON ? messageJSON.channelKey : '';
    this.key = messageJSON ? messageJSON.key : '';
  }

  toJSON() {
    return {
      content: this.content,
      author: this.author,
      imageLinks: this.imageLinks,
      time: this.time.getTime(),
      channelKey: this.channelKey,
      key: this.key
    };
  }

}