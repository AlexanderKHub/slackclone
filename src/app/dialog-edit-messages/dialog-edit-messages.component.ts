import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dialog-edit-messages',
  templateUrl: './dialog-edit-messages.component.html',
  styleUrls: ['./dialog-edit-messages.component.scss'],
})
export class DialogEditMessagesComponent implements OnInit {
  home: object = HomeComponent;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {}

  // deleteMessage(i: number) {
  //  this.messages.splice(i, 1);
  // }

  //editMessage(i: number) {
  // console.log(this.messages[i].content);
  // input = document.getElementById('edit-message-input');

  //  this.messages[i].content = '';
  // this.messages[i].content = input.value;
  //}
}
