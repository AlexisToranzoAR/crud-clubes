import {
    retrieveTeams as retrieveTeamsFromServices
} from '../services/clubs.js';
import seeTeam from './see.js';
import editTeam from './edit.js';
import deleteTeam from './delete.js';
import createTeam from './create.js';

$(document).on('click', '.see-btn', function(e) {
    const tla = e.target.parentElement.id;
    seeTeam(tla);
});
$(document).on('click', '.edit-btn', function(e) {
    const tla = e.target.parentElement.id;
    editTeam(tla);
});
$(document).on('click', '.delete-btn', deleteTeam);
$(document).on('click', '.main-btn', homePage);
$('#create-btn').click(createTeam);

export default async function homePage() {
    const teams = await retrieveTeamsFromServices();

    $(".alert").alert('close')
    $('#create-team').addClass('d-none');
    $('#see-team').addClass('d-none');
    $('#edit-team').addClass('d-none');
    $('#main').removeClass('d-none');
    $('#teams').empty();
    $('#title').html('CRUD Clubes de Futbol')
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
