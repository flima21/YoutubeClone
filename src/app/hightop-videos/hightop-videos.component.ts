import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { YoutubeService } from 'src/services/youtube.service';

@Component({
  selector: 'app-hightop-videos',
  templateUrl: './hightop-videos.component.html',
  styleUrls: ['./hightop-videos.component.css']
})
export class HightopVideosComponent implements OnInit{
  regionUserDefine: any;
  regionCode: string; // Code region user
  categories: any[] = [];
  videos: any[] = [];
  channels: any[] = [];

  constructor(private api: YoutubeService) {
    this.regionCode = '';
    this.regionUserDefine = localStorage.getItem('regionCode')?.toString();
  }

  ngOnInit(): void {
    this.getDataRegion();
  }

  getDataRegion() {
    return this.api.getRegion().subscribe((data) => {
      let region = data.items.filter(item => item.id == this.regionUserDefine);

      if (region.length > 0) {
        this.regionCode = region[0].id;
        this.getVideoCategoryPopular(this.regionCode);
        this.getVideo(this.regionCode,100);
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
