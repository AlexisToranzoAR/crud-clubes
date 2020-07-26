const serverUrl = 'http://localhost:8080';

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

export async function postTeam (tla, formData) {
    const teamUrl = `${serverUrl}/team/${tla}`;
    const init = { 
        method: 'POST',
        body: formData,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    };

    return fetch(teamUrl, init)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`${response.status} http error en postTeam`); 
        })
}

export async function getTeam (tla) {
    const teamUrl = serverUrl + `/team/${tla}`;
    return fetch(teamUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`${response.status} http error en getTeam`);
        })
}

export async function putTeam (tla, formData) {
    console.log(formData)
    const teamUrl = serverUrl + `/team/${tla}`;
    const init = { 
        method: 'PUT',
        body: formData,
        headers:{
            'Content-Type': 'multipart/form-data'
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

export async function deleteTeam (tla) {
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
