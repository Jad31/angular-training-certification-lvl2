import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NbaTeam } from '../models/nba-team.model';

@Injectable({
  providedIn: 'root',
})
export class FreeNbaApiServiceTsService {
  nbaTeams: Observable<NbaTeam>;

  constructor(private http: HttpClient) {
    this.nbaTeams = this.getNbaTeams();
  }

  getNbaTeams() {
    const httpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
    });
    return this.http.get<NbaTeam>('https://free-nba.p.rapidapi.com/teams', {
      headers: httpHeaders,
    });
  }
}
