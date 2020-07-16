const serverUrl = 'http://localhost:8080/';

export function postImage (imageData) {
    const imageUrl = "http://localhost:8080/image";
    const init = { 
        method: 'POST',
        body: imageData,
    };
    return fetch(imageUrl,init)
        .then((response) => {
            if (response.ok) {
                return response.text();
            }
            throw new Error(`${response.status} http error en postImage`); 
        })
        .then((response) => {
            return serverUrl + response;
        })
}

export function deleteImage (imageUrl) {
    const init = { 
        method: 'DELETE'
    };
    return fetch(imageUrl,init)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No se pudo eliminar la imagen con id: ${id}`);
            }
        })
}

export function getTeams () {
    const teamsUrl = "http://localhost:8080/teams";
    return fetch(teamsUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`${response.status} http error en getTeams`);
        })
}

export function putTeams (teamsJson) {
    if (teamsJson === undefined || !typeof teamsJson === 'object') {
        throw new Error('Se necesita un objeto para actualizar equipos.json');
    }
    const teamsUrl = "http://localhost:8080/teams";
    const init = { 
        method: 'PUT',
        body: JSON.stringify(teamsJson),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    return fetch(teamsUrl,init)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No se pudo actualizar equipos.json en putTeams');
            }
        })
}

export function getTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA solicitar un equipo');
    }
    const teamUrl = `http://localhost:8080/team/${tla}`;
    return fetch(teamUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`${response.status} http error en getTeam`);
        })
}

export function putTeam (tla, teamJson) {
    if (tla === undefined || teamJson === undefined || !typeof teamJson === 'object') {
        throw new Error('Se necesita un identificador TLA y un objeto para actualizar un equipo');
    }
    const teamUrl = `http://localhost:8080/team/${tla}`;
    const init = { 
        method: 'PUT',
        body: JSON.stringify(teamJson),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    return fetch(teamUrl,init)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No se pudo actualizar ${tla}.json en putTeam`);
            }
        })
}

export function postTeam (tla, teamJson) {
    if (tla === undefined || teamJson === undefined || !typeof teamJson === 'object') {
        throw new Error('Se necesita un identificador TLA y un objeto para crear un equipo');
    }
    const teamUrl = `http://localhost:8080/team/${tla}`;
    const init = { 
        method: 'POST',
        body: JSON.stringify(teamJson),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    return fetch(teamUrl,init)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No se pudo crear ${tla}.json en postTeam`);
            }
        })
}

export function deleteTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA para eliminar un equipo');
    }
    const teamUrl = `http://localhost:8080/team/${tla}`;
    const init = { 
        method: 'DELETE'
    };
    return fetch(teamUrl,init)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No se pudo eliminar ${tla}.json en deleteTeam`);
            }
        })
}