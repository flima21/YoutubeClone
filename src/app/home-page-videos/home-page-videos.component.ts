import { AfterViewInit, Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt, map } from 'rxjs';
import { YoutubeChannel } from 'src/interface/youtube-channel';
import { YoutubeService } from 'src/services/youtube.service';

@Component({
  selector: 'app-home-page-videos',
  templateUrl: './home-page-videos.component.html',
  styleUrls: ['./home-page-videos.component.css']
})
export class HomePageVideosComponent {
  regionUserDefine: any;
  regionCode: any; // Code region user
  categories: any[] = [];
  videos: any[] = [];
  channels: any[] = [];

  constructor(private api: YoutubeService, private router: Router, private route: ActivatedRoute) {
    this.regionCode = '';
    this.regionUserDefine = localStorage.getItem('regionCode')?.toString();
  }

  ngOnInit(): void {
    this.getDataRegion();
  }

  setFilterVideoByCategory(idCategory: string) {
    this.router.navigate(['home','videos'], {
      queryParams: { query_search: idCategory },
      queryParamsHandling: 'merge'
    });

    this.videos = [];
    this.getVideo(this.regionCode,500);
  }

  getDataRegion() {
    return this.api.getRegion().subscribe((data) => {
      let region = data.items.filter(item => item.id == this.regionUserDefine);

      if (region.length > 0) {
        this.regionCode = region[0].id;
        this.getVideoCategoryPopular(this.regionCode);
        this.getVideo(this.regionCode, 6);
      }

      else {
        this.regionCode = '00';
      }

    });
  }

  getVideoCategoryPopular(codeRegion: string) {
    return this.api.getVideoCategoryPopular(codeRegion).subscribe(data => {
      this.categories = data.items.sort((a,b) => { return a.snippet.title.localeCompare(b.snippet.title);});
    })
  }

  getVideo(codeRegion: string, pagesize: number = 5) {
    this.api.getVideoPopular(codeRegion, pagesize).pipe(
      map((dataVideo: any) => {
        // Insert in videos
        this.videos = dataVideo.items;
        this.route.queryParams.subscribe(params => {
          let search = params['query_search'];

          if (!!search && !!search.trim()) {
            this.videos = this.videos.filter(video => video.snippet && video.snippet.categoryId === search);
          }

        });

        // Get all ids like string 
        const channelIds = this.videos.map((item: any) => item.snippet.channelId).join(',');

        // call the method getChannel
        return this.getChannel(channelIds, codeRegion, pagesize)
      })).subscribe()
  }

  getChannel(channelId: string, codeRegion: string, pagesize: number = 5) {
    return this.api.getChannel(channelId, codeRegion, pagesize).subscribe(data => { this.channels = data.items });
  }

}
