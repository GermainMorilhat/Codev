import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  error: any;
  public user: any;

  constructor(
    public _userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password})
  }

}
