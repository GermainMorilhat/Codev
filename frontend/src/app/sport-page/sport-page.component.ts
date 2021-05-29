import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../login/user.service';
import { RouterModule } from '@angular/router';
import {throwError} from 'rxjs';  // Angular 6/RxJS 6





@Component({
  selector: 'app-sport-page',
  templateUrl: './sport-page.component.html',
  styleUrls: ['./sport-page.component.css']
})
export class SportPageComponent implements OnInit {

  public code;
  sports_list={'football':1}
  public new_post: any;


  constructor(private route: ActivatedRoute,public _userService: UserService) { }


  ngOnInit(): void {
    this.get_data();
    this.new_post = {};

  }


  get_data(){
    this._userService.sport_page(this.route.snapshot.params['sport_name']).subscribe(
      data => {this.code=data;
        console.log(data);
      },
      error => { console.log(error);}
    )
  }
  get_sportid(sport){
    return this.sports_list[sport]
  }
  check_prez(){
    var sport=this.get_sportid(this.route.snapshot.params['sport_name'])
    if(this._userService.presidents[sport]==this._userService.current_user[0].id)
    {return true;}
  
  else {return false;}
}

createPost(){
  var sport=this.get_sportid(this.route.snapshot.params['sport_name'])
  this._userService.create_post({'sport_id': sport, 'author_id': this._userService.id,'post':this.new_post}, this._userService.token).subscribe(
    data => {
      // refresh the list
      this.get_data();
      return true;
    },
    error => {
      console.error('Error saving!');
      console.log(error)
      return throwError(error);
    }
 );
}

}
