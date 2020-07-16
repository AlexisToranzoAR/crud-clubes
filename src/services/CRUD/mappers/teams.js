import Team from '../entities/team.js';

export default function mapearTeams (teamsAPI) {
    const quantityOfTeams = teamsAPI.length;
    let classTeams = [];
    for (let i = 0; i < quantityOfTeams; i++) {
        classTeams.push(new Team(teamsAPI[i]));
    }
    return classTeams
}