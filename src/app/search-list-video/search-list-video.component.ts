import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { YoutubeService } from 'src/services/youtube.service';

@Component({
  selector: 'app-search-list-video',
  templateUrl: './search-list-video.component.html',
  styleUrls: ['./search-list-video.component.css']
})
export class SearchListVideoComponent implements OnInit {

  videosFind : any[] = [];

  constructor(private router: ActivatedRoute, private routerBack: Router, private api: YoutubeService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      let search = params['search_query'];
      
      if (search) {
        this.api.getVideoPopular('BR',100).subscribe((data) => {

          data.items.forEach((element, index) => {
            if (!(element.snippet.title.toLowerCase().includes(search)) && !(element.snippet.description.toLowerCase().includes(search))) {
              data.items.splice(index,1);
            }

          });
          
          this.videosFind = data.items;
        });
      }

      else {
        this.routerBack.navigate(['home/videos']);
      }
    })
  }
}
