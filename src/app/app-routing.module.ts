import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "local-game",
    component: GameComponent,
    data: {matchType: "offline"}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
