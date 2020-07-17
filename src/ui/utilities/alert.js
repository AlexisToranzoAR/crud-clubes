export default function displayAlert(divId, text, alertType, strongText = '') {
    $(`#${divId}`).html(`
      <div class="alert alert-${alertType} alert-dismissible show" role="alert">
          <span>${text}</span>
          <strong>${strongText}</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close-button">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
    `);
  }