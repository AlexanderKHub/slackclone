import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Channel } from 'src/models/channel.class';
import { AuthUserService } from './auth-user.service';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { DialogAddDirectMessageComponent } from './dialog-add-direct-message/dialog-add-direct-message.component';
import { DialogEditChannelComponent } from './dialog-edit-channel/dialog-edit-channel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'slack';
  allChannels: any = [
    new Channel({
      name: 'TestChannel',
      description: 'Dies ist ein Test',
      key: 'jachsdvahc',
    }),
  ];
  allDirectMessages: any = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public auth: AuthUserService,
    public authUser: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage,
  ) {}

  ngOnInit(): void {
    this.firestore
      .collection('channel')
      .valueChanges({ idField: 'channelid' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });

    this.authUser.user.subscribe((user) => {
      this.auth.userKey = '';
      if (!user?.uid) return;
      this.auth.userKey = user?.uid;
      this.router.navigateByUrl(`/home/${this.auth.userKey}/test`);
      this.firestore
        .collection('directMessages')
        .valueChanges({ idField: 'directMessageId' })
        .subscribe((changes: any) => {
          this.allDirectMessages = changes.filter((message: any) =>
            message.users.includes(this.auth.userKey)
          );
        });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent, {});
  }

  openDialogDirectMessage() {
    const dialogRef = this.dialog.open(DialogAddDirectMessageComponent, {});
  }

  editChannel(channel: any) {
    const dialogRef = this.dialog.open(DialogEditChannelComponent);
    dialogRef.componentInstance.channel = channel;
  }

  deleteChannel(channel: any) {
    this.firestore
    .collection('channel')
    .doc(channel.channelid)
    .delete()
    .then(() => {
      this.router.navigateByUrl(`/home/${this.auth.userKey}/test`);
      this.firestore
      .collection('messages')
      .valueChanges({idField: 'messageId' })
      .pipe(take(1))
      .subscribe((messages) => {
        messages
        .filter((message: any) => message.channelKey == channel.channelid)
        .forEach((message: any) => {
          this.deleteMessage(message);
        })
      })
    })
  }

  deleteMessage(message: any) {
    this.firestore
    .collection('messages')
    .doc(message.messageId)
    .delete()
    .then(() => {
      this.deleteThreadMessagesOfMessage(message);
      this.deleteFilesOfMessage(message);
    });
  }


  deleteThreadMessagesOfMessage(message: any) {
    this.firestore
    .collection('threads', ref => ref.where('messageKey', '==', message.messageId))
    .valueChanges({idField: 'threadId' })
    .pipe(take(1))
    .subscribe((threads: any) => {
      threads.forEach((thread: any) => {
        this.firestore
        .collection('threads')
        .doc(thread.threadId)
        .delete()
        .then(() => {
          this.deleteFilesOfMessage(thread);
        });
      });
    });
  }

  deleteFilesOfMessage(message: any) {
    message.imageLinks.forEach((imageLink: string) => {
      this.storage
      .refFromURL(imageLink)
      .delete()
      .subscribe(() => {console.log('File deleted');
      });
    });
  }

}
