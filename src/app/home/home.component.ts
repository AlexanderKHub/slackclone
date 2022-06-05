import { Message } from 'src/models/message.class';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Thread } from 'src/models/thread.class';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessagesComponent } from '../dialog-edit-messages/dialog-edit-messages.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeChannel: any = new Channel();
  authorId: string = '';
  messages!: any;
  users: any = [];
  showThread = false;
  activeThread!: any;
  allThreads!: any;
  currentMessageId!: string;
  currentMessage!: Message;

  htmlMessage!: any;
  htmlThread!: any;

  images: string[] = [];
  imagesThread: string[] = [];

  /// dialog
  animal!: string;
  name!: string;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public dialog: MatDialog
  ) {}

  upload(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    this.storage
      .upload(`/images/${randomId}`, event.target.files[0])
      .then((data: any) => {
        this.storage
          .ref(`/images/${randomId}`)
          .getDownloadURL()
          .subscribe((url: string) => {
            this.images.push(url);
          });
      });
  }

  uploadThread(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    this.storage
      .upload(`/imagesThread/${randomId}`, event.target.files[0])
      .then((data: any) => {
        this.storage
          .ref(`/imagesThread/${randomId}`)
          .getDownloadURL()
          .subscribe((url: string) => {
            this.imagesThread.push(url);
          });
      });
  }

  closeThread() {
    this.showThread = false;
  }

  ngOnInit(): void {
    this.getUsersFromFirestore();
    this.route.params.subscribe((params) => {
      this.authorId = params['uid'];
      this.getActiveChannelFromFirestore(params['channelid']);
      this.getMessagesAndThreadsFromFirestore();
      this.getUsersFromFirestore();
    });
  }

  getActiveChannelFromFirestore(channelId: string) {
    this.checkChannelsFromFirestore(channelId);
    this.checkDirectMessagesFromFirestore(channelId);
  }

  checkChannelsFromFirestore(channelId: string) {
    this.firestore
      .collection('channel')
      .doc(channelId)
      .valueChanges({ idField: 'channelid' })
      .subscribe((changes: any) => {
        if (!changes.name) return;
        this.activeChannel = changes;
      });
  }

  checkDirectMessagesFromFirestore(channelId: string) {
    this.firestore
      .collection('directMessages')
      .doc(channelId)
      .valueChanges({ idField: 'channelid' })
      .subscribe((changes: any) => {
        if (!changes.name) return;
        this.activeChannel = changes;
      });
  }

  getMessagesAndThreadsFromFirestore() {
    this.firestore
      .collection('messages')
      .valueChanges({ idField: 'messageId' })
      .subscribe((changes: any) => {
        this.messages = changes
          .filter((message: any) => {
            return message.channelKey == this.activeChannel.channelid;
          })
          .sort((mess1: any, mess2: any) => {
            return mess1.time - mess2.time;
          });
        this.loadAllThreads();
      });
  }

  getUsersFromFirestore() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((changes: any) => {
        this.users = changes;
      });
  }

  loadAllThreads() {
    this.firestore
      .collection('threads')
      .valueChanges({ idField: 'threadId' })
      .subscribe((changes: any) => {
        this.allThreads = changes.filter((thread: Thread) => {
          for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].messageId == thread.messageKey) return true;
          }
          return false;
        });
        this.findMessageThread(this.currentMessageId);
      });
  }

  findMessageThread(messageId: string) {
    this.activeThread = this.allThreads
      .filter((thread: any) => messageId == thread.messageKey)
      .sort((mess1: any, mess2: any) => {
        return mess1.time - mess2.time;
      });
  }

  getUserById(userId: string) {
    return this.users.find((user: any) => user.userId == userId);
  }

  sendMessage() {
    let newMessage: Message = new Message();
    newMessage.content = this.htmlMessage;
    newMessage.author = this.authorId;
    newMessage.channelKey = this.activeChannel.channelid;
    newMessage.imageLinks = this.images;
    this.firestore.collection('messages').add(newMessage.toJSON());
    this.images = [];
  }

  openThread(message: any) {
    this.findMessageThread(message.messageId);
    this.currentMessageId = message.messageId;
    this.showThread = true;
    this.currentMessage = message;
  }

  sendThreadMessage() {
    let newThread: Thread = new Thread();
    newThread.content = this.htmlThread;
    newThread.author = this.authorId;
    newThread.messageKey = this.currentMessageId;
    newThread.imageLinks = this.imagesThread;
    this.firestore.collection('threads').add(newThread.toJSON());
    this.imagesThread = [];
  }

  openDialog(i: number) {
    const messages = this.dialog.open(DialogEditMessagesComponent);
    messages.componentInstance.messages = this.messages;
    messages.componentInstance.index = i;
  }

  //  dialog.componentInstance.userid = this.messagesI;
}
