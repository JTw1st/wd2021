import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {AppRoutingModule} from "../app-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  title:string='news'

  constructor(public mainService:MainService,
              public router:Router) {

  }

  ngOnInit(): void {

  }

  goToNewsPage(news:any){
    this.mainService.currentNews=news
    this.mainService.count++;
    this.router.navigate(['/news'])
    console.log(this.mainService.currentNews)
  }
  change(index:number){
    this.mainService.changeNws(index)
  }
}
