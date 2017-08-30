import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AboutComponent } from './components/about/about.component';
import { MainComponent } from './components/main/main.component';
import { ChildLeft1Component } from './components/child-left1/child-left1.component';
import { ChildRight1Component } from './components/child-right1/child-right1.component';
import { ChildLeft21Component } from './components/child-left21/child-left21.component';
import { ChildLeft22Component } from './components/child-left22/child-left22.component';
import { ChildRight21Component } from './components/child-right21/child-right21.component';
import { ChildRight22Component } from './components/child-right22/child-right22.component';
import { EventContentComponent } from './components/event-content/event-content.component';
import { YComponent } from './components/y/y.component';

import { DataService } from './services/data.service';
import { EventsService } from './services/events.service';
import { TranslateService } from './services/translate.service';

import { EventContentPipe } from './components/event-content/event-content.pipe';


const appRoutes:Routes = [
	{path: '', component: UserComponent},
	{path: 'about', component: AboutComponent},
  {path: 'testCD', component: MainComponent}];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    MainComponent,
    ChildLeft1Component,
    ChildRight1Component,
    ChildLeft21Component,
    ChildLeft22Component,
    ChildRight21Component,
    ChildRight22Component,
    EventContentComponent,
    YComponent,
    EventContentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService, EventsService, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
