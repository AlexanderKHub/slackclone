import { Message } from 'src/models/message.class';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';

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
  authorId: string = '';
  messages!: Message[];

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authorId = params['uid'];
      this.firestore
        .collection('channel')
        .doc(params['channelid'])
        .valueChanges({ idField: 'channelid' })
        .subscribe((changes: any) => {
          this.activeChannel = changes;
        });

      this.firestore
        .collection('messages')
        .valueChanges({ idField: 'messageId' })
        .subscribe((changes: any) => {
          this.messages = changes.filter((message: any) => {
            return message.channelKey == this.activeChannel.channelid;
          });
        });
    });
  }

  sendMessage(message: string) {
    let newMessage: Message = new Message();
    newMessage.content = message;
    newMessage.author = this.authorId;
    newMessage.channelKey = this.activeChannel.channelid;
    this.firestore.collection('messages').add(newMessage.toJSON());
  }
}
