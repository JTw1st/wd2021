import {Component, HostListener, OnInit} from '@angular/core';
import {MainService} from "../main.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

})
export class MenuComponent implements OnInit {

  constructor(public mainService:MainService) {
    mainService.getDataJson()
  }

  ngOnInit(): void {
    this.mainService.getDataJson()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.mainService.sizeWindow=event.target.innerWidth;
  }

}
