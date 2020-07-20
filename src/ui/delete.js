import {
    deleteTeam as deleteTeamFromServices
} from '../services/clubs.js';
import displayAlert from './utilities/alert.js';
import homePage from './index.js'

export default async function deleteConfirm (e) {
    const tla = e.target.parentElement.id;
    const message = 'El equipo se eliminara para siempre'
    if (window.confirm(message)) {
        try {
            const teams = await deleteTeamFromServices(tla);
            const alertId = 'top-alert';
            const alertMessage = 'El equipo se elimino de forma exitosa. ';
            const alertType = 'success';
            await homePage(teams);
            displayAlert(alertId, alertMessage, alertType);
        } catch (error) {
            const alertId = 'top-alert';
            const alertMessage = 'No fue posible eliminar el equipo. ';
            const alertType = 'danger';
            displayAlert(alertId, alertMessage, alertType);
        }
    }
}