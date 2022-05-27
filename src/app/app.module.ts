import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSidenavModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    NgxAuthFirebaseUIModule.forRoot({
      projectId: 'slack-44d87',
      appId: '1:1091077346802:web:9d5bcc32ff6f75a46b876b',
      storageBucket: 'slack-44d87.appspot.com',
      apiKey: 'AIzaSyA8nrqEocO9WoXqFDT2MpSMGP9pw1K-XaQ',
      authDomain: 'slack-44d87.firebaseapp.com',
      messagingSenderId: '1091077346802',
    },
    () => 'slack-44d87',
                {
                  enableFirestoreSync: true, // enable/disable autosync users with firestore
                  toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
                  toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
                  authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
                  authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
                  passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
                  passwordMinLength: 4, // Password length min/max in forms independently of each componenet min/max.
                  // Same as password but for the name
                  nameMaxLength: 50,
                  nameMinLength: 2,
                  // If set, sign-in/up form is not available until email has been verified.
                  // Plus protected routes are still protected even though user is connected.
                  guardProtectedRoutesUntilEmailIsVerified: true,
                  enableEmailVerification: false, // default: true
                  useRawUserCredential: true, // If set to true outputs the UserCredential object instead of firebase.User after login and signup - Default: false
                }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
