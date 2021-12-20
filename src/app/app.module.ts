import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { InteractionComponent } from './interaction/interaction.component';
import { HomeComponent } from './home/home.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    NewsComponent,
    InteractionComponent,
    HomeComponent,
    NewsPageComponent,
    MainPageComponent
  ],
  imports: [HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'news', component: NewsPageComponent},
    ]),
    BrowserModule,
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
