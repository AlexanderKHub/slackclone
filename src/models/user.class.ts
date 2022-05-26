export interface User{
  name: string,
  key: string
}

export class User {
  name!: string;
  key!: string; // User UID from Firebase Auth

  constructor(userJSON: User){
    this.name = userJSON ? userJSON.name : '';
    this.key = userJSON ? userJSON.key : '';
  }

  toJSON() {
    return {
      name: this.name,
      key: this.key
    };
  }

}