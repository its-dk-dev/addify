import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";

import { FacebookModule } from 'ngx-facebook';
import { FbService } from './services/fb.service';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent }     from './app.component';
import { MyModuleRoutingModule } from './my-module/my-module-routing.module';

import { IndexComponent } from './component/index/index.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PprofileComponent } from './component/pprofile/pprofile.component';
import { ChatComponent } from './component/chat/chat.component';
import { BidComponent } from './component/bid/bid.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    IndexComponent,
    DashboardComponent,
    PprofileComponent,
    ChatComponent,
    BidComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyModuleRoutingModule,
    FlashMessagesModule.forRoot(),
    FacebookModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [FbService,FirebaseService,AngularFirestore,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
