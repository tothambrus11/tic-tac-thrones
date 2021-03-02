import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';
import {HomecontentComponent} from './home/homecontent/homecontent.component';
import {AboutComponent} from './home/about/about.component';
import {FaqComponent} from './home/faq/faq.component';
import {ContactComponent} from './home/contact/contact.component';

const routes: Routes = [
  {
    path: 'local-game',
    component: GameComponent,
    data: {matchType: 'offline'}
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'about', component: AboutComponent},
      {path: 'faq', component: FaqComponent},
      {path: 'contact', component: ContactComponent},
      {path: '', component: HomecontentComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
