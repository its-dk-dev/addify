import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { FbService } from '../../services/fb.service';
import { FirebaseService } from '../../services/firebase.service';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-pprofile',
  templateUrl: './pprofile.component.html',
  styleUrls: ['./pprofile.component.scss']
})

export class PprofileComponent implements OnInit {
  today= new Date();
  jstoday = '';
  id:any;
  publishers: Object;
  private chat:false;
  private bid:false;
  vendors;
  vid;
  vflag : null;
  pflag : null;
  vids;

  constructor(private router : Router;private fbService: FbService,private activatedRoute: ActivatedRoute,private firebaseService: FirebaseService,private cookieService: CookieService) {
	this.id=this.activatedRoute.snapshot.params.id;
  this.vid = cookieService.get('id');
  }

  ngOnInit() {
      this.firebaseService.getPublisher(this.id).subscribe(res => {
        this.publishers = res;
      });
      this.firebaseService.getBid(this.vid).subscribe(res => {
        this.vendors = res;
        console.log(this.vendors);
     });
  }

  chatNow(c_id)
  {
    this.chat=true;
    this.router.navigate([`/chat/${c_id}`]);
  }

  bidNow()
  {
    this.bid=true;
  }



  checkFlagForSend(pid,b_id)
  {
    //for setting bid requests to publisher

    //if and only if vid is not exists
    let tmp = false;
    this.firebaseService.getPublisherBidRequestsIds(pid).subscribe(res => {
      for(let j=0; j < res.length ;j++)
      {
        if(this.res[j].id == this.vid)
        {
          tmp = true;
          break;
        }
      }
    });
    console.log(tmp);
    if(tmp == false)
    {
      let bid_req_data={
        v_id: this.vid;
      }
      this.firebaseService.setBidRequestIDToPublisher(pid,this.vid,bid_req_data);
      console.log("operation suceessfull")
    }
    //this.firebaseService.setBidRequestToPublisher(pid,this.vid,b_id);//push b_id to bids_id array

    //for setting bid requests to vendor
    // this.firebaseService.setBidRequestToVendor(this.vid,b_id,pid);//push pid to bid_request array

    //for setting flags
    this.firebaseService.getVendorBidRequestArray(this.vid,b_id).subscribe(res => {
      console.log(res);
      console.log("daa");
      console.log(res.b_id);
      for(let i = 0; res.bid_req != null &&  i< res.bid_req.length ;i++)
      {
        if(pid === res.bid_req[i])
        {
          this.vflag = b_id;
          break;
        }
      }
    });
    this.firebaseService.getPublisherBidRequestArray(pid,this.vid).subscribe(res => {
      for(let i = 0; i< res.bids_id.length ;i++)
      {
        if(b_id === res.bids_id[i])
        {
          this.pflag = this.vid;
          break;
        }
      }
    });
  }
}
