import {
    deleteTeam as dTeam
} from '../services/teams.js';
import displayAlert from './utilities/alert.js';
import homePage from './main.js'

export default async function deleteTeam (e) {
    const tla = e.target.parentElement.id;
    const message = 'El equipo se eliminara para siempre'
    if (window.confirm(message)) {
        try {
            const teams = await dTeam(tla);
            console.log("callback")
            console.log(teams)
            const alertId = 'top-alert';
            const alertMessage = 'El equipo se elimino de forma exitosa. ';
            const alertType = 'success';
            homePage(teams);
            displayAlert(alertId, alertMessage, alertType);
        } catch (error) {
            const alertId = 'top-alert';
            const alertMessage = 'No fue posible eliminar el equipo. ';
            const alertType = 'danger';
            displayAlert(alertId, alertMessage, alertType);
        }
    }
}