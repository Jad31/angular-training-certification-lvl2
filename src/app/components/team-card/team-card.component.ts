import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NbaGamesResult } from 'src/app/models/nba-game.model';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { HighlightResultDirective } from 'src/app/directives/highlight-result.directive';
import { WinLossPipe } from 'src/app/pipes/win-loss.pipe';
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
    WinLossPipe,
    HighlightResultDirective,
    ConferencePipe,
  ],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input() teamResult: NbaGamesResult | undefined;
  @Output() toRemove = new EventEmitter<string>();

  removeTeamResult(uuid: string | undefined): void {
    if (uuid) {
      this.toRemove.emit(uuid);
    }
  }
}
