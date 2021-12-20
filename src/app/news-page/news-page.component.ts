import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  constructor(public mainService:MainService, public router:Router) {
  }

  ngOnInit(): void {

  }

  back(){
    this.router.navigate(['/'])
  }


}
