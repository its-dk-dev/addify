import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FbService } from '../../services/fb.service';

import { FirebaseService } from "../../services/firebase.service";

import { CookieService } from 'ngx-cookie-service';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: Object;

  constructor(private fbService: FbService,private router: Router,private firebaseService: FirebaseService,private cookieService: CookieService) {
 }

  ngOnInit() {
    this.fbService.getLoginStatus().then(res => {
     if (res.status === "connected") {
      this.fbService.getProfile().then(res => {
        this.user = res;
      })
     }
   });
  }

  dashboard() {
      this.router.navigate([`/dashboard/${this.cookieService.get('id')}`]);
  }

  logout()
  {
    this.cookieService.deleteAll();
    console.log('i am in logout');
    console.log(this.cookieService.getAll());
    console.log('all cookie are free');
    this.fbService.logout();
  }
}
