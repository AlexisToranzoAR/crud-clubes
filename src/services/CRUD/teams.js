import {
    getTeams,
    putTeams
} from '../../API/CRUD.js';
import mapearTeams from './mappers/teams.js';

export async function retrieveTeams () {
    try {
        const dataTeams = await getTeams();
        const classTeams = mapearTeams(dataTeams);
        return classTeams;
    } catch (error) {
        throw new Error('Fallo cargando equipos.json');
    }
}

export async function updateTeams (dataTeams) {
    if (dataTeams === undefined || !typeof dataTeams === 'object') {
        throw new Error('Se necesita un objeto para actualizar equipos.json')
    }
    try {
        const classTeams = mapearTeams(dataTeams);
        console.log('CRUDD')
        console.log(classTeams)
        const ola = await putTeams(classTeams);
        console.log(ola)
        return ola
    } catch (error) {
        throw new Error('Fallo actualizando equipos.json' + error);
    }
}