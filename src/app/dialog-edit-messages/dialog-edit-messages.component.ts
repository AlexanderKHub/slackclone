import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dialog-edit-messages',
  templateUrl: './dialog-edit-messages.component.html',
  styleUrls: ['./dialog-edit-messages.component.scss'],
})
export class DialogEditMessagesComponent implements OnInit {
  messages!: any;
  index!: number;
  id!: string;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {}

  deleteMessage() {
    this.messages.splice(this.index, 1);
  }

  editMessage() {
    console.log(this.messages[this.index].content);

    let input = (<HTMLInputElement>(
      document.getElementById('edit-message-input')
    )).value;
    this.messages[this.index].content = '';
    this.messages[this.index].content = input!;

    this.saveMessages();
  }

  saveMessages() {
    this.firestore
      .collection('messages')
      .doc(this.messages.messagesId)
      .update(this.messages);
  }
}
