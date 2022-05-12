import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import * as firebase from 'firebase';

import { FirebaseService } from 'src/app/services/firebase.service';
import { FbService } from 'src/app/services/fb.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  public id:any;
  public user:Object;
  public chatwith:Object;
  public msg;
  public flag;
  public YourArray = Array<{msg: string,timestamp: string}>;
  public MyArray = Array<{msg: string, timestamp: string}>;
  public const timestamp,tp,time,date;

  constructor(private fbService: FbService,private activatedRoute: ActivatedRoute,private firebaseService: FirebaseService,private cookieService: CookieService) {
    this.id =  cookieService.get('id');
  }

  ngOnInit() {
    if(this.cookieService.get('loginas') === "vendor")
    {
      this.flag = "vendor";
      this.firebaseService.getVendor(this.id).subscribe(res => {
        this.user = res;
      });
      this.firebaseService.getPublisher(this.c_id=this.activatedRoute.snapshot.params.c_id).subscribe(res1 => {
        this.chatwith  = res1;
      });
    }

    if(this.cookieService.get('loginas') === "publisher")
    {
      this.flag = "publisher";
      this.firebaseService.getPublisher(this.id).subscribe(res => {
        this.user = res;
      });
      this.firebaseService.getVendor(this.c_id=this.activatedRoute.snapshot.params.c_id).subscribe(res1 => {
        this.chatwith  = res1;
      });
    }
    this.firebaseService.getYourChat(this.flag,this.c_id).subscribe(res3 => {
      console.log(res3);
      let cnt=1;
      for(let i=0;i<res3.length;i++)
      {
        if(this.id === res3[i].data.pid)
        {
          this.YourArray.push({msg:res3[i].data.msg, timestamp:res3[i].data.timestamp});
        }
      }
      console.log("Whatsapp bro your");
    });

    this.firebaseService.getMyChat(this.flag,this.id).subscribe(res2=> {
      console.log(res2);
      for(let i=0;i<res2.length;i++)
      {
        if(this.c_id === res2[i].data.pid)
        {
          this.MyArray.push({msg:res2[i].data.msg, timestamp:res2[i].data.timestamp});
        }
      }
      console.log("Whatsapp bro my");
    });
  }

  send(chatwithid)
  {
    this.timestamp = this.getTimeStamp();
    console.log(this.timestamp);
    let message={
      msg:this.msg;
      pid:chatwithid;
      timestamp:this.timestamp;
    }
    this.firebaseService.addMessage(this.user.id,message,this.flag);
    this.msg="";
  }

  getTimeStamp() {
    this.dt = new Date();
    this.date = this.dt.getUTCFullYear() + '/' +
                 (this.dt.getUTCMonth() + 1) + '/' +
                 this.dt.getUTCDate();
    this.time = this.dt.getHours() + ':' +
                 this.dt.getMinutes();
    return (this.date + ' ' + this.time);
  }

}
