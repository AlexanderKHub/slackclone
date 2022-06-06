import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-channel',
  templateUrl: './dialog-edit-channel.component.html',
  styleUrls: ['./dialog-edit-channel.component.scss']
})
export class DialogEditChannelComponent implements OnInit {

  channel!: any;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditChannelComponent>
  ) { }

  ngOnInit(): void {
  }

  editChannel(newName: string, newDesciption: string){
    this.channel.name = newName;
    this.channel.description = newDesciption;
    this.firestore
    .collection('channel')
    .doc(this.channel.channelid)
    .update(this.channel);
  } 

}
