import {
    deleteTeam as dTeam
} from '../services/teams.js';
import displayTopAlert from './alerts.js';
import showTeams from './home-page.js'

export default async function deleteTeam (e) {
    const tla = e.target.parentElement.id;
    const message = 'El equipo se eliminara para siempre'
    if (window.confirm(message)) {
        try {
            await dTeam(tla);
            const alertMessage = 'El equipo se elimino de forma exitosa. ';
            const alertType = 'success';
            showTeams;
            displayTopAlert(alertMessage, alertType);
        } catch (error) {
            const alertMessage = 'No fue posible eliminar el equipo. ';
            const alertType = 'danger';
            displayTopAlert(alertMessage, alertType);
        }
    }
}