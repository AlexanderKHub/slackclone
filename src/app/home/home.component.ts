import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allChannels: Channel[] = [new Channel({
    'name': 'TestChannel',
    'description': 'Dies ist ein Test',
    'key': 'jachsdvahc'
  })];

  activeChannel: Channel = this.allChannels[0];
  
  constructor(private firestore:AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
    .collection('channel')
    .valueChanges({idField: 'channelid'})
    .subscribe((changes:any)=>{
      this.allChannels = changes;
    })
  }

}
