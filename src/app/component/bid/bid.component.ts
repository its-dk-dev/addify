import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { FbService } from '../../services/fb.service';
import { FirebaseService } from '../../services/firebase.service';

import { CookieService } from 'ngx-cookie-service';

import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
  id;
  title;
  description;
  picture;
  deal;
  vendors;
  docId;
  constructor(private router : Router;private fbService: FbService,private activatedRoute: ActivatedRoute,private firebaseService: FirebaseService,private cookieService : CookieService) {
    this.id = cookieService.get('id');
}

  ngOnInit() {
      this.firebaseService.getBid(this.id).subscribe(res => {
      this.vendors = res;
      console.log(this.vendors);
    }
  }

  submit(){
    this.docId = this.firebaseService.getBidDocId(this.id);
    console.log(this.docId);

    let bid_data={
      b_id: this.docId;
      bid_req: null;
      title: this.title,
      description: this.desc,
      picture: this.pic,
      deal: this.deal,
    }
    console.log(bid_data);
    // if(this.description != undefined && this.title != undefined && this.deal != undefined) {
      this.firebaseService.bidForm(this.id,this.docId,bid_data);
      // }
    }
}
