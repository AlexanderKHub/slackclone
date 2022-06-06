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
  // index!: number;
  // id!: string;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditMessagesComponent>,
    private storage: AngularFireStorage,
  ) {}

  ngOnInit(): void {}

  deleteMessage() {
    if(this.type == 'message'){
      this.firestore
      .collection('messages')
      .doc(this.message.messageId)
      .delete()
      .then(() => {
        this.deleteThreadMessagesOfCurrentMessage();
        this.deleteFilesOfMessage(this.message);
      });
    }
    if(this.type == 'thread'){
      this.firestore
      .collection('threads')
      .doc(this.message.threadId)
      .delete();
    }
    this.dialogRef.close();
    // this.messages.splice(this.index, 1);
  }

  deleteThreadMessagesOfCurrentMessage() {
    this.firestore
    .collection('threads', ref => ref.where('messageKey', '==', this.message.messageId))
    .valueChanges({idField: 'threadId' })
    .pipe(take(1))
    .subscribe((threads: any) => {
      threads.forEach((thread: any) => {
        this.firestore
        .collection('threads')
        .doc(thread.threadId)
        .delete()
        .then(() => {
          console.log(thread);
          this.deleteFilesOfMessage(thread);
        });
      });
    });
  }

  deleteFilesOfMessage(message: any) {
    message.imageLinks.forEach((imageLink: string) => {
      this.storage
      .refFromURL(imageLink)
      .delete();
    });
  }



  editMessage(newContent: string) {
    // console.log(this.messages[this.index].content);

    // let input = (<HTMLInputElement>(
    //   document.getElementById('edit-message-input')
    // )).value;
    // this.messages[this.index].content = '';
    // this.messages[this.index].content = input!;
    
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

    // this.saveMessages();
  }

  saveMessages() {
    // this.firestore
    //   .collection('messages')
    //   .doc(this.messages.messagesId)
    //   .update(this.messages);
  }
}
