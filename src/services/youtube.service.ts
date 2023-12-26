import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { YoutubeRegion } from 'src/interface/youtube-region';
import { YoutubeChannel } from 'src/interface/youtube-channel';
import { YoutubeVideoCategory } from 'src/interface/youtube-video-category';
import { YoutubeVideo } from 'src/interface/youtube-video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  /*
  # API WILL BE COSNUMING SOME SERVICES:
  1. Channel 
  2. playlist
  3. playlistItem
  4. Thumbnail
  5. video
  6. videoCategory
  7. activity
  8. comment
  9. CommentThread
  10. guideCategory
  11. search result
  */
  constructor(private http:HttpClient) { }

  getRegion(): Observable<YoutubeRegion> {
    return this.http.get<YoutubeRegion>(environment.urlApi + 'i18nRegions?'+ 'key=' + environment.apiKeyYoutube);
  }

  getChannel(channelId:string,regionCode:string): Observable<YoutubeChannel> {
    return this.http.get<YoutubeChannel>(environment.urlApi + 'channels?id=+'+channelId + '&' + 'regionCode='+ regionCode + '&' + 'key=' + environment.apiKeyYoutube + '&' +'part=snippet');
  }

  getVideoCategoryPopular(regionCode:string): Observable<YoutubeVideoCategory> {
    return this.http.get<YoutubeVideoCategory>(environment.urlApi + 'videoCategories?regionCode='+ regionCode + '&' +'key=' + environment.apiKeyYoutube + '&' +'part=snippet');
  }

  getVideoPopular(regionCode:string): Observable<YoutubeVideo> {
    return this.http.get<YoutubeVideo>(environment.urlApi + 'videos?chart=mostPopular&regionCode='+ regionCode + '&' +'key=' + environment.apiKeyYoutube + '&' +'part=snippet,contentDetails,statistics');
  }

}
