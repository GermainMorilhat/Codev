import { Component, OnInit } from '@angular/core';
import {SubscribeService} from '../login/subscribe.service'
import {throwError} from 'rxjs';  // Angular 6/RxJS 6
import {UserService} from '../login/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';






@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  public user: any;
  mySubscription: any;





  constructor(private SubscribeService: SubscribeService, 
    public _userService: UserService, private router: Router) {}

  ngOnInit(): void {
  }


  subscribe(sport){
    
    this.SubscribeService.subscribe({'sport': sport, 'user_id': this._userService.id},this._userService.token).subscribe(
      data => {
        this._userService.refreshToken;
        return true;
      },
      error => {
        console.error('Error saving!');
        return throwError(error);
      }
   );

  }
  unsubscribe(sport){
    
    console.log('id',sport)
    this.SubscribeService.unsubscribe({'sport': sport, 'user_id': this._userService.id},this._userService.token).subscribe(
      data => {
        this._userService.refreshToken;
        return true;
      },
      error => {
        console.error('Error saving!');
        return throwError(error);
      }
   );

  }

  check(id){
    if (this._userService.current_user[0].following.indexOf(id)>=0){
      return true;
    }
    else
    {return false;}

  }
  
  check_prez(sport){
    if(this._userService.presidents[sport]==this._userService.current_user[0].id)
    {return true;}
  
  else {return false;}
}

refreshToken() {
  this._userService.refreshToken();
}





}
