import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Feed } from './../../../models/Feed';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-feed-update',
  templateUrl: './feed-update.component.html',
  styleUrls: ['./feed-update.component.scss']
})
export class FeedUpdateComponent implements OnInit {
  submitted = false;
  feedData: Feed;
  editForm: FormGroup;
  id: String;
  reader = new FileReader();

  constructor(
    private feedService: FeedService,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.getFeed(this.id);

    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, ]],
      source: ['', [Validators.required]],
      publisher: ['', [Validators.required]]
    })
  }

  get myForm() {
    return this.editForm.controls;
  }

  getFeed(id) {
    let baseUrl: string = "assets/img/";
    this.feedService.getFeed(id).subscribe(data => {
      this.feedData = data;
      this.editForm.setValue({
        title: data['title'],
        body: data['body'],
        source : data['source'],
        publisher: data['publisher']
      });
    });
  }

  removeFeed() {
    if(window.confirm('Are you sure u want Delete the Feed?')) {
        this.feedService.deleteFeed(this.id).subscribe((data) => {
          this.router.navigateByUrl('/Feeds');
          console.log('Content deleted successfully!')
        }
      )    
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure u want update the Feed?')) {
        this.feedService.updateFeed(this.id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/Feeds');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

  handleFileInput(fileInput){
  
    let file = fileInput[0];
    console.log(file)

    this.feedData.image = file.name
  }

}
