import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { GamesResultsComponent } from './app/components/games-results/games-results.component';
import { SelectTeamComponent } from './app/components/select-team/select-team.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const routes: Route[] = [
  {
    path: '',
    component: SelectTeamComponent,
  },
  {
    path: 'results/:teamCode',
    component: GamesResultsComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, StoreModule.forRoot()),
    provideHttpClient(),
  ],
});
