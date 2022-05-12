import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { FbService } from '../../services/fb.service';
import { FirebaseService } from '../../services/firebase.service';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  id:any;
  user:Object;
  timeline: string;
  publishers: Object;
  public show = false;

  constructor(private fbService: FbService,private activatedRoute: ActivatedRoute,private firebaseService: FirebaseService,private cookieService: CookieService) {
    this.id =  cookieService.get('id');
  }

  ngOnInit() {
    if(this.cookieService.get('loginas') === "vendor")
    {
      this.firebaseService.getVendor(this.id).subscribe(res => {
        this.user = res;
      });
    }

    if(this.cookieService.get('loginas') === "publisher")
    {
      this.firebaseService.getPublisher(this.id).subscribe(res => {
        this.user = res;
        this.timeline = 'timeline';
      });
    }
  }

  listPublishers()
  {
      this.firebaseService.getPublishers().subscribe(res => {
      this.publishers= res;
      this.show = true;
    });
  }
}
