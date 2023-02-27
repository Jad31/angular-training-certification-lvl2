import { Component, Input } from '@angular/core';
import { FreeNbaApiService } from 'src/app/services/free-nba-api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NbaGamesResult } from 'src/app/models/nba-game.model';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  providers: [FreeNbaApiService],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input() teamResult: NbaGamesResult | undefined;

  constructor() {}
}
