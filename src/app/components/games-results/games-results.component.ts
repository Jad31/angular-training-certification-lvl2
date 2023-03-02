import { Component, Input, OnInit } from '@angular/core';
import { FreeNbaApiService } from 'src/app/services/free-nba-api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NbaGamesResult } from 'src/app/models/nba-game.model';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ConferencePipe } from 'src/app/pipes/conference.pipe';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    ConferencePipe,
  ],
  templateUrl: './games-results.component.html',
  styleUrls: ['./games-results.component.scss'],
})
export class GamesResultsComponent implements OnInit {
  team: string;
  gameResults: NbaGamesResult | undefined;
  concurrentTeams: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private freeNbaApiService: FreeNbaApiService
  ) {
    this.team = this.route.snapshot.params['teamCode'];
  }

  ngOnInit(): void {
    this.freeNbaApiService.gamesResult$
      .pipe(
        tap((gameResults) => {
          this.gameResults = gameResults.find((gameResult) => {
            return gameResult.team_abbreviation === this.team;
          });
        })
      )
      .subscribe();
    if (this.gameResults !== undefined) {
      this.concurrentTeams = this.freeNbaApiService.getConcurrentTeams({
        nbaGames: this.gameResults?.games,
        teamName: this.team,
      });
    }
    console.log(this.gameResults);
  }
}
