import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  Feed : any = [];

  constructor(
    private router: Router,
    private feedService: FeedService) { 
      this.readFeed();
    }

  ngOnInit(): void {}

  readFeed(){
    this.feedService.getFeeds().subscribe((data) => {
      console.log("llega"+data[0].title)
     this.Feed = data;
    })    
  }
  setDefaultPic(feedInfo){
    feedInfo.image = "not_image.jpg";
  }
}
