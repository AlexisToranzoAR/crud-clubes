/// <reference types="jquery" />

import {
    retrieveTeams
} from '../services/teams.js';
import seeTeam from './see.js';
import editTeam from './edit.js';
import deleteTeam from './delete.js';
import createTeam from './create.js';

$(document).on('click', '.see-btn', seeTeam);
$(document).on('click', '.edit-btn', editTeam);
$(document).on('click', '.delete-btn', deleteTeam);
$(document).on('click', '.main-btn', showTeams);
$('#create-btn').click(createTeam);

export default async function showTeams() {
    $(".alert").alert('close')
    $('#create-team').addClass('d-none');
    $('#see-team').addClass('d-none');
    $('#edit-team').addClass('d-none');
    $('#main').removeClass('d-none');
    $('#teams').empty();
    $('#title').html('CRUD Clubes de Futbol')
    const teams = await retrieveTeams();
    $('#quantity-of-teams').html(teams.length);
    teams.forEach((team, i) => {
        $('#teams').append(`
            <tr>
                <th scope="row">${i+1}</th>
                <td>${team.shortName}</td>
                <td>${team.area.name}</td>
                <td id="${team.tla}">
                    <span class="see-btn btn btn-outline-primary btn-sm">Ver</span> - 
                    <span class="edit-btn btn btn-outline-warning btn-sm">Editar</span> - 
                    <span class="delete-btn btn btn-outline-danger btn-sm">Eliminar</span>
                </td>
            </tr>
        `)
    })
}
