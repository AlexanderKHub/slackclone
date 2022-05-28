import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthUserService,
    private router: Router
    ){ }

  ngOnInit(): void {
  }

  logInSuccess(event: any){
    this.auth.userKey = event.user.multiFactor.user.uid;
    this.router.navigateByUrl(`/home/${this.auth.userKey}`);
  }

  logInError(event: any){
    // Handle Error
  }
  
}
