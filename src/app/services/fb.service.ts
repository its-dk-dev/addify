import { Injectable } from '@angular/core';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent, LoginStatus } from 'ngx-facebook';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { FlashMessagesService } from 'angular2-flash-messages';

import { FirebaseService } from './firebase.service';

import { CookieService } from 'ngx-cookie-service';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FbService {
  constructor(private fb: FacebookService,private router: Router,private http: Http,private firebaseService: FirebaseService,private flashMessage: FlashMessagesService,private cookieService: CookieService) {
      console.log('Initializing Facebook');

      fb.init({
        appId: '547027175729481',
        version: 'v2.8'
      });

    }

    vlogin() {
        this.fb.login()
          .then((res: LoginResponse) => {
            this.fb.api('/me?fields=id,name,gender,picture.type(large),email,friends,location').then(res => {
              if(res.hasOwnProperty("location") && res.hasOwnProperty("email") && res.hasOwnProperty("gender")) {
                let vendor = {
                  id: res.id,
                  name: res.name,
                  email: res.email,
                  friends: res.friends.summary.total_count,
                  location: res.location.name,
                  avatar: res.picture.data.url,
                  gender: res.gender
                }
                console.log('You are logged in as Vendor');
                this.cookieService.set('login','true');
                this.cookieService.set('loginas','vendor');
                this.cookieService.set('id',vendor.id);
                // this.flashMessage.show("You are logged in as a vendor", {cssClass: 'alert-success', timeout: 5000});
                this.firebaseService.getVendor1(vendor.id).subscribe(res => {
                  if(res.payload.exists) {
                  this.router.navigate([`/dashboard/${vendor.id}`]);
                  console.log(vendor.id);
                  } else {
                    this.firebaseService.addVendor(vendor);
                    console.log('added');
                  }
                })

              } else {
                this.flashMessage.show("Please make sure that your profile is public...", {cssClass: 'alert-danger', timeout: 5000});
              }
            })
          })
      }

    plogin() {
        this.fb.login()
          .then((res: LoginResponse) => {
            this.fb.api('/me?fields=id,name,gender,picture.type(large),email,friends,location, posts.fields(message, likes.summary(true), comments.summary(true), picture)').then(res => {
              if(res.hasOwnProperty("location") && res.hasOwnProperty("email") && res.hasOwnProperty("gender")) {
                let publisher = {
                  id: res.id,
                  name: res.name,
                  email: res.email,
                  friends: res.friends.summary.total_count,
                  location: res.location.name,
                  avatar: res.picture.data.url,
                  gender: res.gender,
                  posts:res.posts.data
                }
                console.log('You are logged in as Publisher');
                this.cookieService.set('login','true');
                this.cookieService.set('loginas','publisher');
                this.cookieService.set('id',publisher.id);
                // this.flashMessage.show("You are logged in as a vendor", {cssClass: 'alert-success', timeout: 5000});
                this.firebaseService.getPublisher1(publisher.id).subscribe(res => {
                  if(res.payload.exists) {
                  this.router.navigate([`/dashboard/${publisher.id}`]);
                  console.log(publisher.id);
                  } else {
                    this.firebaseService.addPublisher(publisher);
                    console.log('added');
                  }
                })
              } else {
                this.flashMessage.show("Please make sure that your profile is public...", {cssClass: 'alert-danger', timeout: 5000});
              }
            })
          })

      }

      logout() {
        this.fb.logout().then(() => {
          console.log('You are logged out');
          this.router.navigate(["/"]);
          this.flashMessage.show("You are now logged out...", {cssClass: 'alert-danger', timeout: 5000});
        })
      }

      getLoginStatus(): Promise<LoginStatus>{
        let status =  this.fb.getLoginStatus()
          return status;
      }

      getProfile(): Promise<any[]> {
       let profile = this.fb.api('/me')
          return profile;
      }
}
