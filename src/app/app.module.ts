import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePrincipalPageComponent } from './home-principal-page/home-principal-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageVideosComponent } from './home-page-videos/home-page-videos.component';
import { HightopVideosComponent } from './hightop-videos/hightop-videos.component';
import { FormsModule } from '@angular/forms';
import { SearchListVideoComponent } from './search-list-video/search-list-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePrincipalPageComponent,
    HomePageVideosComponent,
    HightopVideosComponent,
    SearchListVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
