import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dialog-edit-messages',
  templateUrl: './dialog-edit-messages.component.html',
  styleUrls: ['./dialog-edit-messages.component.scss'],
})
export class DialogEditMessagesComponent implements OnInit {
  message!: any;
  type!: string;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditMessagesComponent>,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {}

  



  editMessage(newContent: string) {
    this.message.content = newContent;
    if(this.type == 'message'){
      this.firestore
      .collection('messages')
      .doc(this.message.messageId)
      .update(this.message);
    }
    if(this.type == 'thread'){
      this.firestore
      .collection('threads')
      .doc(this.message.threadId)
      .update(this.message);
    }
    this.dialogRef.close();
  }

}
