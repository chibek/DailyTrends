import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { ScrapingService } from '../../services/scraping.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds-list.component.html',
  styleUrls: ['./feeds-list.component.scss']
})
export class FeedsComponent implements OnInit {
  Feed : any = [];

  constructor(
    private router: Router,
    private feedService: FeedService,
    private scrapingService: ScrapingService,
    private authService:AuthService
    ) { 

    if (!authService.loggedIn()) {
        this.router.navigateByUrl('/signin')
    }else{
      this.readFeed();
      this.scrapElmundo();
      this.scrapElpais();
    }
  }
  ngOnInit(): void {}

  readFeed(){
    
    this.feedService.getFeedsElMundoToday().subscribe((data) => {
     this.Feed = data;
     this.feedService.getFeedsElPaisToday().subscribe((data) => {
      this.Feed = this.Feed.concat(data);
       this.feedService.getFeedsCustom().subscribe((data)=> {
         console.log(data)
        this.Feed = this.Feed.concat(data);
       })
     })
    })    
  }

  scrapElmundo(){
    this.scrapingService.getMundoScraping().subscribe((data) => {
      console.log("subscribe")
    })
  }

  scrapElpais(){
    this.scrapingService.getPaisScraping().subscribe((data) => {
      console.log("subscribe")
    })
  }

  

  setDefaultPic(feedInfo){
    feedInfo.image = "/assets/img/not_image.jpg";
  }
}
