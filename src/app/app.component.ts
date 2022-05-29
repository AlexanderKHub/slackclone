import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'slack';
  allChannels: Channel[] = [new Channel({
    'name': 'TestChannel',
    'description': 'Dies ist ein Test',
    'key': 'jachsdvahc'
  })];

  constructor(public dialog: MatDialog, private firestore:AngularFirestore){}

  ngOnInit(): void {
    this.firestore
    .collection('channel')
    .valueChanges({idField: 'channelid'})
    .subscribe((changes:any)=>{
      this.allChannels = changes;
    })
  }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddChannelComponent, {
        
      });
    }

  }

 
  


