import { Component } from '@angular/core';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slack';
  allChannels: Channel[] = [new Channel({
    'name': 'TestChannel',
    'description': 'Dies ist ein Test',
    'key': 'jachsdvahc'
  })];

  constructor(){}

  addChannel() {
    
  }

}
