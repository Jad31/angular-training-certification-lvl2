import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectTeamComponent } from './components/select-team/select-team.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SelectTeamComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
