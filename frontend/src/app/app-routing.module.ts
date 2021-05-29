import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';
import {SportsComponent} from './sports/sports.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {SportPageComponent} from './sport-page/sport-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'login', component: LoginComponent},
  { path: 'mon_profil', component: MyAccountComponent},
  { path: 'sports/:sport_name', component: SportPageComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
