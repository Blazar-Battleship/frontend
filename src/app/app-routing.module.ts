import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { PlaceShipsScreenComponent } from './components/place-ships-screen/place-ships-screen.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LeaderboardScreenComponent } from './components/leaderboard-screen/leaderboard-screen.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';

const routes: Routes = [
  {path:"home" , component:HomeScreenComponent},
  {path:"play" , component:PlayScreenComponent},
  {path:"place-ships" , component:PlaceShipsScreenComponent},
  {path:"players-form" , component:RegistrationFormComponent},
  {path:"leaderboard" , component:LeaderboardScreenComponent},
  {path:"" , pathMatch:"full", redirectTo:"/players-form"},
  {path:"**" , redirectTo:"/home"},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
