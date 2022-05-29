export interface Thread {
  content: string;
  author: string;
  imageLinks: string[];
  time: Date;
  messageKey: string;
  key: string;
}

export class Thread {
  content!: string;
  author!: string;
  imageLinks!: string[];
  time!: Date;
  messageKey!: string;
  key!: string;

  constructor(threadJSON?: Thread) {
    this.content = threadJSON ? threadJSON.content : '';
    this.author = threadJSON ? threadJSON.author : '';
    this.imageLinks = threadJSON ? threadJSON.imageLinks : [];
    this.time = threadJSON ? new Date(threadJSON.time) : new Date();
    this.messageKey = threadJSON ? threadJSON.messageKey : '';
    this.key = threadJSON ? threadJSON.key : '';
  }

  toJSON() {
    return {
      content: this.content,
      author: this.author,
      imageLinks: this.imageLinks,
      time: this.time.getTime(),
      messageKey: this.messageKey,
      key: this.key,
    };
  }
}
