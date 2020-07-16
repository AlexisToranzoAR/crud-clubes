import {
    createTeam as cTeam,
    retrieveTeam as rTeam,
    updateTeam as uTeam,
    deleteTeam as dTeam
} from './CRUD/team.js';
import {
    retrieveTeams as rTeams,
    updateTeams as uTeams
} from './CRUD/teams.js'

export async function createTeam(dataTeam) {
    if (dataTeam === undefined || !typeof dataTeam === 'object') {
        throw new Error('Se necesita un objeto para crear un equipo');
    }
    try {
        const dataTeams = await rTeams();
        await cTeam(dataTeam);
        delete dataTeam.activeCompetitions;
        delete dataTeam.squad;
        dataTeams.splice(dataTeams.length, 1, dataTeam);
        await uTeams(dataTeams);
    } catch (error) {
        throw console.error(error);
    }
}

export async function retrieveTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA para solicitar un equipo');
    }
    try {
        return await rTeam(tla);
    } catch (error) {
        throw console.error(error);
    }
}

export async function updateTeam (dataTeam) {
    if (dataTeam === undefined || !typeof dataTeam === 'object') {
        throw new Error('Se necesita un objeto para actualizar un equipo');
    }
    try {
        const tla = dataTeam.tla;
        const dataTeams = await rTeams();
        await uTeam(dataTeam);
        delete dataTeam.activeCompetitions;
        delete dataTeam.squad;
        const quantityOfTeams = dataTeams.length;
        for (let i = 0; i < quantityOfTeams; i++) {
            if (dataTeams[i].tla === tla) {
                dataTeams.splice(i, 1, dataTeam);
                await uTeams(dataTeams);
                return;
            }
        }
        throw new Error(`No se pudo actualizar al equipo con TLA: ${tla}`);
    } catch (error) {
        throw console.error(error);
    }
}

export async function deleteTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA para eliminar un equipo');
    }
    try {
        const dataTeams = await rTeams();
        const quantityOfTeams = dataTeams.length;
        for (let i = 0; i < quantityOfTeams; i++) {
            if (dataTeams[i].tla === tla) {
                dataTeams.splice(i, 1);
                await uTeams(dataTeams);
                await dTeam(tla);
                return;
            }
        }
        throw new Error(`No se pudo borrar al equipo con TLA: ${tla}`);
    } catch (error) {
        throw console.error(error);
    }
}

export async function retrieveTeams () {
    try {
        return await rTeams();
    } catch (error) {
        throw console.error(error);
    }
}