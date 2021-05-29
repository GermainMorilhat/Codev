import { Component, OnInit } from '@angular/core';
import {UserService} from '../login/user.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(public _userService: UserService) { }

  ngOnInit(): void {
  }

}
