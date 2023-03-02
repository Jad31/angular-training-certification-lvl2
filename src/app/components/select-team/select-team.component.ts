import { Component, OnDestroy, OnInit } from '@angular/core';
import { FreeNbaApiService } from 'src/app/services/free-nba-api.service';
import { MatSelectModule } from '@angular/material/select';
import { NbaTeam } from 'src/app/models/nba-team.model';
import { Observable, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TeamCardComponent } from '../team-card/team-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NbaGamesResult } from 'src/app/models/nba-game.model';

@Component({
  selector: 'app-select-team',
  standalone: true,
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss'],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    TeamCardComponent,
    MatGridListModule,
  ],
})
export class SelectTeamComponent implements OnInit {
  nbaTeams$: Observable<NbaTeam[]> | undefined;
  selectedTeam: string = '';
  teamResults$: Observable<NbaGamesResult[]> | undefined;

  constructor(private freeNbaApiService: FreeNbaApiService) {}

  ngOnInit(): void {
    this.nbaTeams$ = this.freeNbaApiService.getNbaTeams();
    this.teamResults$ = this.freeNbaApiService.gamesResult$;
  }

  trackTeam(): void {
    if (this.selectedTeam !== '' && this.nbaTeams$ !== undefined) {
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

  removeResult(uuid: string): void {
    this.freeNbaApiService.removeTeamResult({ uuid });
  }
}
