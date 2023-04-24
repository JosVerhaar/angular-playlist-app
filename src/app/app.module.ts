import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ArtistsModule } from './modules/artists/artists.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { ComponentsModule } from './base/components/components.module';
import { FormBuilder } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    ArtistsModule,
    PlaylistsModule,
    ComponentsModule
  ],
  providers: [
    FormBuilder
  ],
  exports: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
