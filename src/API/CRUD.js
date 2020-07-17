const serverUrl = 'http://localhost:8080';

export async function postImage (imageData) {
    const imageUrl = serverUrl + '/image';
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
            return `${serverUrl}/${response}`;
        })
}

export async function deleteImage (imageUrl) {
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

export async function getTeams () {
    const teamsUrl = serverUrl + '/teams';
    return fetch(teamsUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`${response.status} http error en getTeams`);
        })
}

export async function putTeams (teamsJson) {
    if (teamsJson === undefined || !typeof teamsJson === 'object') {
        throw new Error('Se necesita un objeto para actualizar equipos.json');
    }
    const teamsUrl = serverUrl + '/teams';
    const init = { 
        method: 'PUT',
        body: JSON.stringify(teamsJson),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    return fetch(teamsUrl,init)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('No se pudo actualizar equipos.json en putTeams');
        })
}

export async function getTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA solicitar un equipo');
    }
    const teamUrl = serverUrl + `/team/${tla}`;
    return fetch(teamUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`${response.status} http error en getTeam`);
        })
}

export async function putTeam (tla, teamJson) {
    if (tla === undefined || teamJson === undefined || !typeof teamJson === 'object') {
        throw new Error('Se necesita un identificador TLA y un objeto para actualizar un equipo');
    }
    const teamUrl = serverUrl + `/team/${tla}`;
    const init = { 
        method: 'PUT',
        body: JSON.stringify(teamJson),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    return fetch(teamUrl,init)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`No se pudo actualizar ${tla}.json en putTeam`);
        })
}

export async function postTeam (tla, teamJson) {
    if (tla === undefined || teamJson === undefined || !typeof teamJson === 'object') {
        throw new Error('Se necesita un identificador TLA y un objeto para crear un equipo');
    }
    const teamUrl = serverUrl + `/team/${tla}`;
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

export async function deleteTeam (tla) {
    if (tla === undefined) {
        throw new Error('Se necesita un identificador TLA para eliminar un equipo');
    }
    const teamUrl = serverUrl + `/team/${tla}`;
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