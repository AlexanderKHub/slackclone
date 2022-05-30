import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { AuthUserService } from './auth-user.service';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';

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

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public auth: AuthUserService,
    public authUser: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firestore
      .collection('channel')
      .valueChanges({ idField: 'channelid' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });
      
    this.authUser.user.subscribe((user) => {
      if(!user?.uid) return;
      this.auth.userKey = user?.uid;
      this.router.navigateByUrl(`/home/${this.auth.userKey}/test`);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddChannelComponent, {});
  }
}
