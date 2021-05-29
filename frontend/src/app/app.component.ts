import { Component } from '@angular/core';
import {UserService} from './login/user.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public username;
  public user;
  constructor(public _userService: UserService) {
   }

   ngOnInit() {
    }



  refreshToken() {
    this._userService.refreshToken();
  }
  
  logout() {
    this._userService.logout();
  }
  


}

