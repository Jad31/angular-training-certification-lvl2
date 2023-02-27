import { Component, OnDestroy, OnInit } from '@angular/core';
import { FreeNbaApiService } from 'src/app/services/free-nba-api.service';
import { MatSelectModule } from '@angular/material/select';
import { NbaTeam } from 'src/app/models/nba-team.model';
import { map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NbaGamesResult } from 'src/app/models/nba-game.model';
import { Subscription } from 'rxjs';
import { TeamCardComponent } from '../team-card/team-card.component';

@Component({
  selector: 'app-select-team',
  standalone: true,
  providers: [FreeNbaApiService],
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss'],
  imports: [CommonModule, MatSelectModule, MatButtonModule, TeamCardComponent],
})
export class SelectTeamComponent {
  nbaTeams$: Observable<NbaTeam[]>;
  selectedTeam: string = '';
  teamResults$: Observable<NbaGamesResult[]>;

  constructor(private freeNbaApiService: FreeNbaApiService) {
    this.nbaTeams$ = this.freeNbaApiService.getNbaTeams();
    this.teamResults$ = this.freeNbaApiService.gamesResult$;
  }

  trackTeam(): void {
    if (this.selectedTeam !== '') {
      this.nbaTeams$
        .pipe(
          tap((teams) => {
            const team = teams.find(
              (team) => team.full_name === this.selectedTeam
            );
            if (team !== undefined) {
              this.freeNbaApiService.getTeamResult({
                team,
              });
            }
          })
        )
        .subscribe();
    }
  }
}
