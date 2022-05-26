export interface Channel{
  name: string,
  description: string,
  key: string
}

export class Channel {
  name!: string;
  description!: string;
  key!: string; 

  constructor(channelJSON: Channel){
    this.name = channelJSON ? channelJSON.name : '';
    this.description = channelJSON ? channelJSON.description : '';
    this.key = channelJSON ? channelJSON.key : '';
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      key: this.key
    };
  }

}