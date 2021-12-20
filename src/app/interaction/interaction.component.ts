import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss']
})
export class InteractionComponent implements OnInit {
  title:string='interaction'
  name:string=''
  phone:string=''
  f:boolean=false

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit():void{
    this.f=true
  }

}
