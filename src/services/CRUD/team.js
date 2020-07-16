import {
    getTeam,
    putTeam,
    postTeam,
    deleteTeam as eraseTeam
} from '../../API/CRUD.js';
import mapearTeam from './mappers/team.js';

export async function retrieveTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA para solicitar un equipo');
    }
    try {
        const dataTeam = await getTeam(tla);
        const classTeam = mapearTeam(dataTeam);
        return classTeam;
    } catch (error) {
        throw new Error(`Fallo cargando ${tla}.json`);
    }
}

export async function updateTeam (dataTeam) {
    if (dataTeam === undefined || !typeof dataTeam === 'object') {
        throw new Error('Se necesita un identificador TLA y un objeto para actualizar un equipo');
    }
    try {
        const tla = dataTeam.tla;
        const classTeam = mapearTeam(dataTeam);
        await putTeam(tla, classTeam);
    } catch (error) {
        throw new Error(`Fallo actualizando ${tla}.json`);
    }
}

export async function createTeam (dataTeam) {
    if (dataTeam === undefined || !typeof dataTeam === 'object') {
        throw new Error('Se necesita un identificador TLA y un objeto para crear un equipo');
    }
    try {
        const tla = dataTeam.tla;
        const classTeam = mapearTeam(dataTeam);
        await postTeam(tla, classTeam);
    } catch (error) {
        throw new Error(`Fallo creando ${tla}.json`);
    }
}

export async function deleteTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA para eliminar un equipo');
    }
    try {
        await eraseTeam(tla);
    } catch (error) {
        throw new Error(`Fallo eliminado ${tla}.json`);
    }
}