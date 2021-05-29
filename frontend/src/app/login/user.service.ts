import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  public presidents;

  // the username of the logged in user
  public username: string;
  
  public id: any;

  public current_user: any;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient,private router: Router,
    ) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

  }

  ngOninit(){
    
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post('http://localhost:8000/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        console.log('login success', data);
        this.updateData(data['token']);
        this.router.navigate(['./']);
      },
      err => {
        console.error('login error', err);
        this.errors = err['error'];
      }
    );
  }

  /**
   * Refreshes the JWT token, to extend the time the user is logged in
   */
  public refreshToken() {
    this.http.post('http://localhost:8000/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        console.log('refresh success', data);
        this.updateData(data['token']);
      },
      err => {
        console.error('refresh error', err);
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    this.id=token_decoded.user_id;
    this.get_user(this.id).subscribe(
      // the first argument is a function which runs on success
      data => {
        this.current_user = data;
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading user')
    );
    this.prez().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.presidents = data;
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading presidents')
    );
  }

  get_user(id) {
    console.log('trying to get user',this.id)
    return this.http.get('http://localhost:8000/profil/'+id+'/');
  }

  prez(){
    return this.http.get('http://localhost:8000/prez/');

  }

  sport_page(sport_name){
    return this.http.get('http://localhost:8000/sports/'+sport_name+'/')
  }

  create_post(arg, token) {
    return this.http.post('http://localhost:8000/posts/', JSON.stringify(arg), this.getHttpOptions());
  }
  
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      })
    };
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }


}