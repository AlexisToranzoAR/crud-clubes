import {
    retrieveTeam,
    updateTeam
} from '../services/clubs.js';
import seeTeam from './see.js';
import displayAlert from './utilities/alert.js'

$(document).on('click', '.cancel-btn', function (e) {
    const tla = e.target.parentElement.id;
    seeTeam(tla)
});

$("#edit-image").change(function () {
    readURL(this);
});

export default async function editTeam(tla) {
    $('#save-edit-btn').click(function (e) {
        saveTeam(team);
    });

    $(".alert").alert('close');

    const team = await retrieveTeam(tla);
    const date = new Date();
    const actualDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    $('#team-edit-logo').attr('src', team.crestUrl);
    $('#edit-team nav').attr('id', tla);
    $('#team-edit-name').attr('value', team.name);
    $('#team-edit-shortname').attr('value', team.shortName);
    $('#team-edit-area-name').attr('value', team.area.name);
    $('#team-edit-tla').attr('value', team.tla);
    $('#team-edit-address').attr('value', team.address);
    $('#team-edit-phone').attr('value', team.phone);
    $('#team-edit-website').attr('value', team.website);
    $('#team-edit-email').attr('value', team.email);
    $('#team-edit-founded').attr('value', team.founded);
    $('#team-edit-clubcolors').attr('value', team.clubColors);
    $('#team-edit-venue').attr('value', team.venue);
    $('#team-edit-lastupdated').html(actualDate);
    $('#title').html('Editar: ' + team.name);
    $('#main').addClass('d-none');
    $('#see-team').addClass('d-none');
    $('#edit-team').removeClass('d-none');
}

async function saveTeam(team) {
    const updatedTeam = {
        activeCompetitions: team.activeCompetitions,
        squad: team.squad,
        area: {
            id: team.area.id,
            name: $('#team-edit-area-name').val()
        },
        name: $('#team-edit-name').val(),
        shortName: $('#team-edit-shortname').val(),
        tla: $('#team-edit-tla').val(),
        address: $('#team-edit-address').val(),
        phone: $('#team-edit-phone').val(),
        website: $('#team-edit-website').val(),
        email: $('#team-edit-email').val(),
        founded: $('#team-edit-founded').val(),
        clubColors: $('#team-edit-clubcolors').val(),
        venue: $('#team-edit-venue').val(),
        lastUpdated: $('#team-edit-lastupdated').text(),
    }

    const inpFile = document.getElementById("edit-image");
    const dataLogo = inpFile.files[0];

    try {
        await updateTeam(updatedTeam, dataLogo);
        const alertId = 'top-alert';
        const alertMessage = 'Actualización exitosa del equipo de futbol ';
        const strongerMessage = `${updatedTeam.name}`;
        const alertType = 'success';
        $('.cancel-btn').first().trigger('click')
        displayAlert(alertId, alertMessage, alertType, strongerMessage);
    } catch (error) {
        const alertId = 'top-alert';
        const alertMessage = 'No se pudo actualizar el equipo de futbol ';
        const strongerMessage = `${updatedTeam.name}`;
        const alertType = 'danger';
        $('.cancel-btn').first().trigger('click')
        displayAlert(alertId, alertMessage, alertType, strongerMessage);
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#team-edit-logo').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}