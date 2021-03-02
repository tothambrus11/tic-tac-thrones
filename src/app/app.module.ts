import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FieldComponent } from './game/field/field.component';
import { MiniboardComponent } from './game/miniboard/miniboard.component';
import { HomecontentComponent } from './home/homecontent/homecontent.component';
import { AboutComponent } from './home/about/about.component';
import { FaqComponent } from './home/faq/faq.component';
import { ContactComponent } from './home/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    FieldComponent,
    MiniboardComponent,
    HomecontentComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

