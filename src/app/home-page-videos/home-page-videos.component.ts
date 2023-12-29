import { AfterViewInit, Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { YoutubeService } from 'src/services/youtube.service';

@Component({
  selector: 'app-home-page-videos',
  templateUrl: './home-page-videos.component.html',
  styleUrls: ['./home-page-videos.component.css']
})

export class HomePageVideosComponent implements OnInit, AfterViewInit {
  regionUserDefine: any;
  regionCode: any; // Code region user
  categories: any[] = [];
  videos: any[] = [];
  channels: any[] = [];

  /**
   * 
   * @param api 
   * @param router 
   * @param route 
   */
  constructor(private api: YoutubeService, private router: Router, private route: ActivatedRoute) {
    this.regionCode = '';
    this.regionUserDefine = localStorage.getItem('regionCode')?.toString();
  }

  /**
   * 
   */
  ngOnInit(): void {
    this.getDataRegion();
  }

  /**
   * 
   */
  ngAfterViewInit(): void {
    // localStorage.removeItem('videoCategories');
  }

  /**
   * 
   * @param idCategory 
   */
  setFilterVideoByCategory(idCategory: string) {
    this.router.navigate(['home', 'videos'], {
      queryParams: { query_search: idCategory },
      queryParamsHandling: 'merge'
    });

    this.videos = [];
    this.getVideo(this.regionCode, 500);
  }

  /**
   * 
   * @returns 
   */
  getDataRegion() {
    return this.api.getRegion().subscribe((data) => {
      let region = data.items.filter(item => item.id == this.regionUserDefine);

      if (region.length > 0) {
        this.regionCode = region[0].id;
        this.getVideo(this.regionCode, 6);
        this.getVideoCategoryPopular(this.regionCode);
      }

      else {
        this.regionCode = '00';
      }

    });
  }

  /**
   * 
   * @param codeRegion 
   * @returns 
   */
  getVideoCategoryPopular(codeRegion: string) {
    return this.api.getVideoCategoryPopular(codeRegion).subscribe(data => {
      let arrayCategories = localStorage.getItem('videoCategories')?.split(',').map(num => (num.trim()));

      this.categories = data.items.sort((a, b) => { return a.snippet.title.localeCompare(b.snippet.title); });
      this.categories = this.categories.filter(idCategory => arrayCategories?.includes(idCategory.id.toString()));
    })
  }

  /**
   * 
   * @param codeRegion 
   * @param pagesize 
   */
  getVideo(codeRegion: string, pagesize: number = 5) {
    this.api.getVideoPopular(codeRegion, pagesize).pipe(
      map((dataVideo: any) => {
        // Insert in videos
        this.videos = dataVideo.items;
        this.route.queryParams.subscribe(params => {
          let search = params['query_search'];
          
          localStorage.removeItem('videoCategories');
          
          if (!!search && !!search.trim()) {
            this.videos = this.videos.filter(video => video.snippet && video.snippet.categoryId === search);
          }

        });

        // Get all ids like string 
        const channelIds = this.videos.map((item: any) => item.snippet.channelId).join(',');
        const videoCategories = this.videos.map((item: any) => item.snippet.categoryId).join(',');


        localStorage.setItem('videoCategories', videoCategories);

        // call the method getChannel
        return this.getChannel(channelIds, codeRegion, pagesize)
      })
    ).subscribe()
  }

  /**
   * 
   * @param channelId 
   * @param codeRegion 
   * @param pagesize 
   * @returns 
   */
  getChannel(channelId: string, codeRegion: string, pagesize: number = 5) {
    return this.api.getChannel(channelId, codeRegion, pagesize).subscribe(data => { this.channels = data.items });
  }

}
