import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NbaTeam } from './models/nba-team.model';
import { FreeNbaApiServiceTsService } from './services/free-nba-api.service.ts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nbaTeams: Observable<NbaTeam>;

  constructor(private freeNbaApiServiceTsService: FreeNbaApiServiceTsService) {
    this.nbaTeams = this.freeNbaApiServiceTsService.nbaTeams;
  }
}
