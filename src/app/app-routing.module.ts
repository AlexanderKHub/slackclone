import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home/:uid/:channelid/:treadid', component: HomeComponent},
  { path: 'home/:uid/:channelid/:treadid', component: ThreadComponent, outlet: 'router2'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
