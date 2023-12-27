import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { YoutubeService } from 'src/services/youtube.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home-principal-page',
  templateUrl: './home-principal-page.component.html',
  styleUrls: ['./home-principal-page.component.css']
})
export class HomePrincipalPageComponent implements OnInit {
  regionUserDefine: any;
  regionCode: any; // Code region user
  categories: any[] = [];
  videos: any[] = [];
  channels: any[] = [];

  textSearch : string = '';

  constructor(private api: YoutubeService, private route:ActivatedRoute, private router:Router) {
    this.regionCode = '';
    this.regionUserDefine = localStorage.getItem('regionCode')?.toString();
  }

  ngOnInit(): void {
    this.getDataRegion();
  }

  setSearchVideoList() {
    if(this.textSearch.length > 0) {
      // this.router.navigateByUrl(`/searchlist/${this.textSearch}`);
      this.router.navigate(['home', 'searchlist'],{
        queryParams: { query_search : this.textSearch },
        queryParamsHandling: 'merge'
      });
    }
  }

  getDataRegion() {
    return this.api.getRegion().subscribe((data) => {
      let region = data.items.filter(item => item.id == this.regionUserDefine);

      if (region.length > 0) {
        this.regionCode = region[0].id;
        this.getVideoCategoryPopular(this.regionCode);
        this.getVideo(this.regionCode,6);
      }

      else {
        this.regionUserDefine = this.regionCode = null;
      }
    });
  }

  getVideoCategoryPopular(codeRegion: string) {
    return this.api.getVideoCategoryPopular(codeRegion).subscribe(data => {
      this.categories = data.items;
    })
  }

  getVideo(codeRegion: string,pagesize:number =5) {
    this.api.getVideoPopular(codeRegion,pagesize).pipe(
      map((dataVideo: any) => {
        // Insert in videos
        this.videos = dataVideo.items;

        // Get all ids like string 
        const channelIds = dataVideo.items.map((item: any) => item.snippet.channelId).join(',');

        // call the method getChannel
        return this.getChannel(channelIds, codeRegion,pagesize)
      })).subscribe()
  }

  getChannel(channelId: string, codeRegion: string,pagesize:number=5) {
    return this.api.getChannel(channelId, codeRegion,pagesize).subscribe(data => { this.channels = data.items;});
  }

}
// this.router.navigateByUrl(`player/lista/artista/${artistaId}`);

/*
export const PlayerRotas: Routes = [
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'artistas',
                component: ArtistasComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'lista/:tipo/:id',
                component: ListaMusicasComponent
            }
        ]
    }
]
*/