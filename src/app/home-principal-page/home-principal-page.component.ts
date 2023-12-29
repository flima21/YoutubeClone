import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from 'src/services/youtube.service';

@Component({
  selector: 'app-home-principal-page',
  templateUrl: './home-principal-page.component.html',
  styleUrls: ['./home-principal-page.component.css']
})
export class HomePrincipalPageComponent implements OnInit {
  regionUserDefine: any; // Code defined in index.html from api
  regionCode: any; // Code region user
  textSearch : string = ''; // text that user search a video

  constructor(private api: YoutubeService, private router:Router) {
    this.regionUserDefine = localStorage.getItem('regionCode') ? localStorage.getItem('regionCode')?.toString() : null;
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
  setSearchVideoList() {
    if(this.textSearch.length > 0) {
      this.router.navigate(['home', 'searchlist'],{
        queryParams: { query_search : this.textSearch },
        queryParamsHandling: 'merge'
      });
    }
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
      }

      else {
        this.regionUserDefine = this.regionCode = null;
      }
    });
  }
}