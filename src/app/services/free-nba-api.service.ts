import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbaTeam } from '../models/nba-team.model';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { NbaGame, NbaGamesResult } from '../models/nba-game.model';

@Injectable({
  providedIn: 'root',
})
export class FreeNbaApiService {
  gamesResult = new BehaviorSubject<NbaGamesResult[]>([]);
  gamesResult$ = this.gamesResult.asObservable();

  private httpHeaders = new HttpHeaders({
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  getNbaTeams(): Observable<NbaTeam[]> {
    return this.http
      .get<{ data: NbaTeam[] }>('https://free-nba.p.rapidapi.com/teams', {
        headers: this.httpHeaders,
      })
      .pipe(map(({ data }) => data));
  }

  getTeamResult({ team }: { team: NbaTeam }) {
    const httpParams = new HttpParams({
      fromObject: {
        page: '0',
        per_page: '12',
        'team_ids[]': `${team.id}`,
        'dates[]': this.getPastDates(),
      },
    });
    this.http
      .get<{ data: NbaGame[] }>(`https://free-nba.p.rapidapi.com/games`, {
        headers: this.httpHeaders,
        params: httpParams,
      })
      .pipe(
        map(({ data }) => {
          const gamesResult: NbaGamesResult = {
            logo_url: `https://interstate21.com/nba-logos/${team.abbreviation}.png`,
            games: [],
            average_conceded: 0,
            average_scored: 0,
            results: [],
            conference: team.conference,
            team_abbreviation: team.abbreviation,
            team_name: team.full_name,
          };
          let totalPointsScored = 0;
          let totalPointsConceded = 0;

          data.forEach((game) => {
            gamesResult.games.push(game);
            if (game.home_team.id === team.id) {
              totalPointsScored += game.home_team_score;
              totalPointsConceded += game.visitor_team_score;
              if (game.home_team_score > game.visitor_team_score) {
                gamesResult.results.push('win');
              } else {
                gamesResult.results.push('lose');
              }
            }
            if (game.visitor_team.id === team.id) {
              totalPointsScored += game.visitor_team_score;
              totalPointsConceded += game.home_team_score;
              if (game.visitor_team_score > game.home_team_score) {
                gamesResult.results.push('win');
              } else {
                gamesResult.results.push('lose');
              }
            }
          });
          gamesResult.average_scored = totalPointsScored / data.length;
          gamesResult.average_conceded = totalPointsConceded / data.length;
          this.gamesResult.next([...this.gamesResult.getValue(), gamesResult]);
        })
      )
      .subscribe();
  }

  getPastDates(): string[] {
    const dates: string[] = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i - 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      dates.push(formattedDate);
    }
    return dates;
  }
}
