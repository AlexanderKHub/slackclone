import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-chat',
  templateUrl: './dialog-edit-chat.component.html',
  styleUrls: ['./dialog-edit-chat.component.scss']
})
export class DialogEditChatComponent implements OnInit {

  directMessageChannel!: any;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditChatComponent>
  ) { }

  ngOnInit(): void {
  }

  editChannel(newName: string){
    this.directMessageChannel.name = newName;
    this.firestore
    .collection('directMessages')
    .doc(this.directMessageChannel.directMessageId)
    .update(this.directMessageChannel);
    this.dialogRef.close();
  } 

}
