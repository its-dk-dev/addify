import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FbService } from '../../services/fb.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private fbService: FbService,
    private router: Router
  ) {
  }

  vlogin() {
   this.fbService.vlogin();
  }

  plogin() {
   this.fbService.plogin();
  }

  ngOnInit() {
  }
}
