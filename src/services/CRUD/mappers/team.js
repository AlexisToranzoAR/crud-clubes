import Team from '../entities/team.js';

export default function mapearTeam (teamAPI) {
    return new Team(teamAPI);
}