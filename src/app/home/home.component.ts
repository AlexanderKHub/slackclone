import { Message } from 'src/models/message.class';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { User } from 'src/models/user.class';
import { Directionality } from '@angular/cdk/bidi';
import { DirectMassage } from 'src/models/directMessage.class';
import { Thread } from 'src/models/thread.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeChannel: any = new Channel({
    name: 'TestChannel',
    description: 'Dies ist ein Test',
    key: 'jachsdvahc',
  });
  // activeDirectMessage: any = new DirectMassage();
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

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((changes: any) => {
        this.users = changes;
      });

    this.route.params.subscribe((params) => {
      this.authorId = params['uid'];
      this.firestore
        .collection('channel')
        .doc(params['channelid'])
        .valueChanges({ idField: 'channelid' })
        .subscribe((changes: any) => {
          if (!changes.name) return;
          this.activeChannel = changes;
        });

      this.firestore
        .collection('directMessages')
        .doc(params['channelid'])
        .valueChanges({ idField: 'channelid' })
        .subscribe((changes: any) => {
          if (!changes.name) return;
          this.activeChannel = changes;
        });

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

      this.firestore
        .collection('users')
        .valueChanges({ idField: 'userId' })
        .subscribe((changes: any) => {
          this.users = changes;
        });
    });
  }

  loadAllThreads() {
    this.firestore
      .collection('threads')
      .valueChanges({ idField: 'threadId' })
      .subscribe((changes: any) => {
        console.log('Update AllThreads from firebase');

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
    this.firestore.collection('messages').add(newMessage.toJSON());
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
    console.log(newThread);

    this.firestore.collection('threads').add(newThread.toJSON());
  }










}
