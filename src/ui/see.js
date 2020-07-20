import { retrieveTeam } from '../services/clubs.js';

export default async function seeTeam (tla) {
    $(".alert").alert('close')
    const team = await retrieveTeam(tla);
    $('#team-logo').attr('src',team.crestUrl);
    $('#see-team nav').attr('id',tla);
    $('#team-name').html(team.name);
    $('#team-shortname').html(team.shortName);
    $('#team-area-name').html(team.area.name);
    $('#team-tla').html(team.tla);
    $('#team-address').html(team.address);
    $('#team-phone').html(team.phone).attr('href','tel:' + team.phone);
    $('#team-website').html(team.website).attr('href',team.website);
    $('#team-email').html(team.email).attr('href','mailto:' + team.email);
    $('#team-founded').html(team.founded);
    $('#team-clubcolors').html(team.clubColors);
    $('#team-venue').html(team.venue);
    $('#team-lastupdated').html(team.lastUpdated.slice(0,10));
    $('#title').html(team.name);
    $('#main').addClass('d-none');
    $('#edit-team').addClass('d-none');
    $('#see-team').removeClass('d-none');
}