import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';


@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {
  myChannel: Channel = new Channel();

  constructor(public dialogRef: MatDialogRef<DialogAddChannelComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  saveChannel(){
    this.firestore
    .collection('channel')
    .add(this.myChannel.toJSON())
  }

}
