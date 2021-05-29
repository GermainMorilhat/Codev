  
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable()
export class SubscribeService {

  constructor(private http: HttpClient, private _userService: UserService) {
  }

  // send a POST request to the API to create a new data object
  subscribe(arg,token) {
    return this.http.post('http://localhost:8000/subscription/',JSON.stringify(arg), this.getHttpOptions());
  }

  unsubscribe(arg,token) {
    return this.http.post('http://localhost:8000/unsubscription/',JSON.stringify(arg), this.getHttpOptions());
  }

  // helper function to build the HTTP headers
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._userService.token
      })
    };
  }

}