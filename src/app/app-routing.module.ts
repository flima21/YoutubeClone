import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePrincipalPageComponent } from './home-principal-page/home-principal-page.component';
import { HomePageVideosComponent } from './home-page-videos/home-page-videos.component';
import { HightopVideosComponent } from './hightop-videos/hightop-videos.component';
import { SearchListVideoComponent } from './search-list-video/search-list-video.component';

const routes: Routes = [
  { path:'', redirectTo:'home/videos', pathMatch:'full' },
  { path:'home', component: HomePrincipalPageComponent, children: [
    { path: 'videos' , component: HomePageVideosComponent },
    { path: 'treeding' , component: HightopVideosComponent },
    { path: 'searchlist' , component: SearchListVideoComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
