import {
    createTeam as createTeamFromServices
} from '../services/clubs.js';
import homePage from './index.js';
import displayAlert from './utilities/alert.js';

$('#save-create-btn').click(saveTeam);
$("#create-image").change(function() {
    readURL(this);
});

export default async function createTeam() {
    const date = new Date();
    const actualDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    $('#create-team input').val('');
    $('#team-create-lastupdated').html(actualDate);
    $('#title').html('Crear equipo');
    $('#main').addClass('d-none');
    $('#create-team').removeClass('d-none');
}

async function saveTeam() {
    const team = {
        activeCompetitions: {},
        squad: {},
        area: {
            id: 0,
            name: $('#team-create-area-name').val()
        },
        name: $('#team-create-name').val(),
        shortName: $('#team-create-shortname').val(),
        tla: $('#team-create-tla').val(),
        address: $('#team-create-address').val(),
        phone: $('#team-create-phone').val(),
        website: $('#team-create-website').val(),
        email: $('#team-create-email').val(),
        founded: $('#team-create-founded').val(),
        clubColors: $('#team-create-clubcolors').val(),
        venue: $('#team-create-venue').val(),
        lastUpdated: $('#team-create-lastupdated').text(),
    }

    const inpFile = document.getElementById("create-image");
    const dataLogo = inpFile.files[0];

    try {
        await createTeamFromServices(team, dataLogo);
        const alertId = 'top-alert';
        const alertMessage = 'El equipo se creo exitosamente';
        const alertType = 'success';
        homePage();
        displayAlert(alertId, alertMessage, alertType);
    } catch (error) {
        const alertId = 'top-alert';
        const alertMessage = 'No se pudo crear el equipo ';
        const alertType = 'danger';
        homePage();
        displayAlert(alertId, alertMessage, alertType);
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#preview-image').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }