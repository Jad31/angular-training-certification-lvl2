import { startOfDay, subDays, format } from 'date-fns';
import { NbaGame, NbaGamesResult } from '../models/nba-game.model';
import { v4 as uuidv4 } from 'uuid';
import { NbaTeam } from '../models/nba-team.model';

export function getPastDates(): string[] {
  const currentDate = startOfDay(new Date());
  const pastDays = [];

  for (let i = 0; i < 12; i++) {
    const pastDate = subDays(currentDate, i);
    const formattedDate = format(pastDate, 'yyyy-MM-dd');
    pastDays.push(formattedDate);
  }
  return pastDays;
}

export function retrieveNbaGameResult({
  team,
  games,
  logoBaseUrl,
}: {
  team: NbaTeam;
  games: NbaGame[];
  logoBaseUrl: string;
}) {
  const gamesResult: NbaGamesResult = {
    uuid: uuidv4(),
    logo_url: `${logoBaseUrl}/${team.abbreviation}.png`,
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

  games.forEach((game) => {
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
  gamesResult.average_scored = totalPointsScored / games.length;
  gamesResult.average_conceded = totalPointsConceded / games.length;
  return gamesResult;
}
