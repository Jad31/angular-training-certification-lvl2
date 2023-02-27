import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SelectTeamComponent } from './components/select-team/select-team.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, SelectTeamComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
