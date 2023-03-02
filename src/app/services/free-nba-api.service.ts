import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbaTeam } from '../models/nba-team.model';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs';
import { NbaGame, NbaGamesResult } from '../models/nba-game.model';
import {
  logoBaseUrl,
  rapidApiKeys,
  rapidBaseUrl,
} from '../../environments/environment';
import {
  getPastDates,
  retrieveNbaGameResult,
} from './free-nba-api.service.helpers';

@Injectable({
  providedIn: 'root',
})
export class FreeNbaApiService {
  gamesResult = new BehaviorSubject<NbaGamesResult[]>([]);
  gamesResult$ = this.gamesResult.asObservable();

  private httpHeaders = new HttpHeaders({
    'X-RapidAPI-Key': rapidApiKeys.XRapidAPIKey,
    'X-RapidAPI-Host': rapidApiKeys.XRapidAPIHost,
  });

  constructor(private http: HttpClient) {}

  getNbaTeams(): Observable<NbaTeam[]> {
    return this.http
      .get<{ data: NbaTeam[] }>(`${rapidBaseUrl}/teams`, {
        headers: this.httpHeaders,
      })
      .pipe(map(({ data }) => data));
  }

  getTeamResult({ team }: { team: NbaTeam }): void {
    const httpParams = new HttpParams({
      fromObject: {
        page: '0',
        per_page: '12',
        'team_ids[]': `${team.id}`,
        'dates[]': getPastDates(),
      },
    });
    this.http
      .get<{ data: NbaGame[] }>(`${rapidBaseUrl}/games`, {
        headers: this.httpHeaders,
        params: httpParams,
      })
      .pipe(
        map(({ data }) => {
          const gamesResult: NbaGamesResult = retrieveNbaGameResult({
            games: data,
            team,
            logoBaseUrl,
          });
          this.gamesResult.next([...this.gamesResult.getValue(), gamesResult]);
        })
      )
      .subscribe();
  }

  getConcurrentTeams({
    nbaGames,
    teamName,
  }: {
    nbaGames: NbaGame[];
    teamName: string;
  }) {
    const concurrentTeams: string[] = [];
    nbaGames.forEach((nbaGame) => {
      if (nbaGame.home_team.abbreviation !== teamName) {
        concurrentTeams.push(nbaGame.home_team.abbreviation);
      } else if (nbaGame.visitor_team.abbreviation !== teamName) {
        concurrentTeams.push(nbaGame.visitor_team.abbreviation);
      }
    });
    return concurrentTeams;
  }

  removeTeamResult({ uuid }: { uuid: string }): void {
    const currentGames = [...this.gamesResult.getValue()];
    const updatedGames = currentGames.filter(
      (currentGame) => currentGame.uuid !== uuid
    );
    this.gamesResult.next(updatedGames);
  }
}
