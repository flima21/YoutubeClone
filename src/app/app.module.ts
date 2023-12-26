import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePrincipalPageComponent } from './home-principal-page/home-principal-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageVideosComponent } from './home-page-videos/home-page-videos.component';
import { HightopVideosComponent } from './hightop-videos/hightop-videos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePrincipalPageComponent,
    HomePageVideosComponent,
    HightopVideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
