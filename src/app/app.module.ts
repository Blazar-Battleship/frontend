import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayScreenComponent } from './components/play-screen/play-screen.component';
import { PlayGridComponent } from './components/play-grid/play-grid.component';

import { GridTemplateComponent } from './components/grid-template/grid-template.component';
import { NgIconsModule } from '@ng-icons/core';
import { tablerTrophyFilled } from '@ng-icons/tabler-icons';
import { PlaceShipsScreenComponent } from './components/place-ships-screen/place-ships-screen.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { PlayerService } from './services/player.service';
import { HeaderComponent } from './components/header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    PlayScreenComponent,
    PlayGridComponent,
    GridTemplateComponent,
    PlaceShipsScreenComponent,
    RegistrationFormComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgIconsModule.withIcons({ tablerTrophyFilled }),
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
