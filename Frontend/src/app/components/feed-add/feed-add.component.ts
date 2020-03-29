import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Feed } from './../../models/Feed';
import { ActivatedRoute, Router } from "@angular/router";
import {  RxwebValidators  } from "@rxweb/reactive-form-validators";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-feed-add',
  templateUrl: './feed-add.component.html',
  styleUrls: ['./feed-add.component.scss']
})
export class FeedAddComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  image:String;
  reader = new FileReader();
  imageUpload: Boolean = false;
  formData = new FormData();
  baseUri:string = 'http://localhost:3000/';
  constructor(
    private feedService: FeedService,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService

    ) { 
      if (!authService.loggedIn()) {
        this.router.navigateByUrl('/signin')
    }else{
      this.mainForm()
    }}

  ngOnInit(): void {
  
  }

  mainForm() {
  this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      image:['',[Validators.required,RxwebValidators.extension({extensions:["jpeg","png","jpg"]})]],
      body: ['', [Validators.required, ]],
      source: ['', [Validators.required]],
      publisher: ['', [Validators.required]]
    })
 }
  get myForm() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure u want add the Feed?')) {
        if(this.imageUpload){
          this.feedService.uploadImage(this.formData);
          this.editForm.controls['image'].setValue(`${this.baseUri}`+this.image);
        }
        this.feedService.createFeed(this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/Feeds');
            console.log('Content created successfully!')
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
      console.log(file)
      this.image = file.name;
      this.imageUpload  =true
    }
  }

}

