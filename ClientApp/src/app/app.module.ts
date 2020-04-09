import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberDirective } from './subscriber.directive';
import { StateService } from './stateService'
import { OpentokService } from './opentok';
import { VideoComponent } from './video/video.component';
import { JoinComponent } from './join/join.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent, 
    SubscriberComponent, 
    PublisherComponent,
    SubscriberDirective,
    VideoComponent,
    JoinComponent,    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
      ReactiveFormsModule,
      //StateService,
      RouterModule.forRoot([
          { path: '', component: JoinComponent, pathMatch: 'full' },
          { path: 'video', component: VideoComponent, pathMatch: 'full' },
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent },
        { path: 'publisher', component: PublisherComponent },
        { path: 'subscriber', component: SubscriberComponent }
    ])
  ],
  providers: [],
    bootstrap: [AppComponent],
    entryComponents: [PublisherComponent, SubscriberComponent]
})
export class AppModule { }
