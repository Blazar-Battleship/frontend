import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { PlaceShipsScreenComponent } from './components/place-ships-screen/place-ships-screen.component';

const routes: Routes = [
  {path:"play" , component:PlayScreenComponent},
  {path:"place-ships" , component:PlaceShipsScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
