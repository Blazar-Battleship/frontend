import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { PlayGridComponent } from './components/play-grid/play-grid.component';

import {MatButtonModule} from '@angular/material/button';
import { GridTemplateComponent } from './components/grid-template/grid-template.component';
import { NgIconsModule } from '@ng-icons/core';
import { tablerTrophyFilled } from '@ng-icons/tabler-icons';
import { PlaceShipsScreenComponent } from './components/place-ships-screen/place-ships-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayScreenComponent,
    PlayGridComponent,
    GridTemplateComponent,
    PlaceShipsScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgIconsModule.withIcons({ tablerTrophyFilled }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
