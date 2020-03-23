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
  imageUpload: Boolean = false;
  formData = new FormData();

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
    this.feedService.getFeed(id).subscribe(data => {
      this.feedData = data;
      console.log( data['source'])
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
        this.feedService.updateFeed(this.id, this.editForm.value, this.feedData.image)
          .subscribe(res => {
            if(this.imageUpload){
              this.feedService.uploadImage(this.formData);
            }
            
            this.router.navigateByUrl('/Feeds');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('file', file);
      this.feedData.image = file.name;
    }
  }

}

