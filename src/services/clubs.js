import {
    getTeams as getTeamsFromAPI,
    postTeam as postTeamFromAPI,
    getTeam as getTeamFromAPI,
    putTeam as updateTeamFromAPI,
    deleteTeam as deleteTeamFromAPI
} from '../API/CRUD.js';
import mapearTeam from './mappers/team.js';

export async function retrieveTeams () {
    try {
        return await getTeamsFromAPI();
    } catch (error) {
        throw console.error(error);
    }
}

export async function createTeam(dataTeam, dataLogo) {
    if (dataTeam === undefined || !typeof dataTeam === 'object') {
        throw new Error('Se necesita un objeto para crear un equipo');
    }
    try {
        const tla = dataTeam.tla;
        const formData = new FormData();
        formData.append('team', mapearTeam(dataTeam));
        if(!dataLogo === undefined) {
            formData.append('logo', dataLogo);
        }
        return await postTeamFromAPI(tla, formData);
    } catch (error) {
        throw console.error(error);
    }
}

export async function retrieveTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA para solicitar un equipo');
    }
    try {
        return mapearTeam(await getTeamFromAPI(tla));
    } catch (error) {
        throw console.error(error);
    }
}

export async function updateTeam (dataTeam, dataLogo) {
    if (dataTeam === undefined || !typeof dataTeam === 'object') {
        throw new Error('Se necesita un objeto para actualizar un equipo');
    }
    try {
        console.log("SERVICS")
        console.log(dataTeam)
        console.log(dataLogo)
        const tla = dataTeam.tla;
        const formData = new FormData();
        formData.append('team', mapearTeam(dataTeam));
        if(!dataLogo === undefined) {
            formData.append('logo', dataLogo);
        }
        return await updateTeamFromAPI(tla, formData);
    } catch (error) {
        throw console.error(error);
    }
}

export async function deleteTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA para eliminar un equipo');
    }
    try {
        await deleteTeamFromAPI(tla);
    } catch (error) {
        throw console.error(error);
    }
}
