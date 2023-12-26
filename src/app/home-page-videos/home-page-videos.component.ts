import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { YoutubeChannel } from 'src/interface/youtube-channel';
import { YoutubeService } from 'src/services/youtube.service';

@Component({
  selector: 'app-home-page-videos',
  templateUrl: './home-page-videos.component.html',
  styleUrls: ['./home-page-videos.component.css']
})
export class HomePageVideosComponent {
  regionUserDefine: string;
  regionCode: string; // Code region user
  categories: any[] = [];
  videos: any[] = [];
  channels: any[] = [];

  constructor(private api: YoutubeService) {
    this.regionCode = '';
    this.regionUserDefine = 'BR';
  }

  ngOnInit(): void {
    this.getDataRegion();
  }

  // ngAfterViewInit(): void {
  //   console.log(this.channels);    
  // }

  getDataRegion() {
    return this.api.getRegion().subscribe((data) => {
      let region = data.items.filter(item => item.id == this.regionUserDefine);

      if (region.length > 0) {
        this.regionCode = region[0].id;
        this.getVideoCategoryPopular(this.regionCode);
        this.getVideo(this.regionCode,6);
        // this.getChannel(channelId,this.regionCode);
      }

      else {
        this.regionCode = '00';
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
