import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { GridComponent } from './components/grid/grid.component';

import {MatButtonModule} from '@angular/material/button';
import { GridTemplateComponent } from './components/grid-template/grid-template.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayScreenComponent,
    GridComponent,
    GridTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
