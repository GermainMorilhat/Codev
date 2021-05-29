import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SportsComponent } from './sports/sports.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {UserService} from './login/user.service';
import {SubscribeService} from './login/subscribe.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { SportPageComponent } from './sport-page/sport-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SportsComponent,
    FeedComponent,
    LoginComponent,
    MyAccountComponent,
    SportPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [
    UserService,
    SubscribeService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
