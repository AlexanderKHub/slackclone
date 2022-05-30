import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { DirectMassage } from 'src/models/directMessage.class';
import { AuthUserService } from '../auth-user.service';

@Component({
  selector: 'app-dialog-add-direct-message',
  templateUrl: './dialog-add-direct-message.component.html',
  styleUrls: ['./dialog-add-direct-message.component.scss']
})
export class DialogAddDirectMessageComponent implements OnInit {


  constructor( 
    private firestore: AngularFirestore,
    private auth: AuthUserService
  ) { }

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'userId'})
    .subscribe((changes: any) => {
      this.users = changes;
    })
  }

  selectedUsers = new FormControl();

  users: any = [];

  newDirectMessage: DirectMassage = new DirectMassage();

  usersWithoutMe() {
    return this.users.filter((user: any) => !(user.userId == this.auth.userKey));
  }


  onNoClick(){

  }

  saveChannel(){
    this.selectedUsers.value.forEach((user: any) => {
      this.newDirectMessage.users.push(user.userId)
    });
    this.newDirectMessage.users.push(this.auth.userKey);
    this.firestore
    .collection('directMessages')
    .add(this.newDirectMessage.toJSON())
        
    
  }
}
