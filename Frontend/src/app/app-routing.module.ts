import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { FeedsComponent } from './components/feeds-list/feeds-list.component';
import { HomeComponent } from './components/home/home.component';
import { FeedUpdateComponent } from './components/feed-update/feed-update.component';
import { FeedAddComponent } from './components/feed-add/feed-add.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },

  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'Feeds',
    component: FeedsComponent
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'edit-feed/:id', component: FeedUpdateComponent,
  },
  {
    path: 'addFeed', component: FeedAddComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
