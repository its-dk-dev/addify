import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent }     from '../app.component';
import { IndexComponent } from '../component/index/index.component';
import { FooterComponent } from '../component/footer/footer.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { PprofileComponent } from '../component/pprofile/pprofile.component';
import { ChatComponent } from '../component/chat/chat.component';
import { BidComponent } from '../component/bid/bid.component';

const appRoutes: Routes = [
  { path: '',  component: IndexComponent },
  { path: 'footer',  component: FooterComponent },
  { path: 'dashboard/:id',  component: DashboardComponent },
  { path: 'publish_prof/:id',  component: PprofileComponent },
  { path: 'chat/:c_id',  component: ChatComponent },
  { path: 'bid',  component: BidComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class MyModuleRoutingModule { }
