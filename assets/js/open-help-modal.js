  //todo: check if works and finish
  const openHelpModalFn = function () {
    const $modalJob = document.getElementById('modalProblem');
    const $modalHelpTrigger = document.getElementsByClassName('modalHelpTrigger');

    if ($modalJob && $modalHelpTrigger) {
      for (let i = 0; i < $modalHelpTrigger.length; i++) {
        $modalHelpTrigger[i].addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const $sendErrorFieldsMsg = document.getElementById('sendErrorFileds');
          const $sendErrorMsg = document.getElementById('sendError');
          const $sendSuccessMsg = document.getElementById('sendSuccess');
          const $jobForm = document.getElementById('jobForm');
          const $title = document.getElementById('titleJobModal');
          const $titleMail = document.getElementById('titleMailJobModal');
          $jobForm.reset();
          $sendSuccessMsg.classList.add('d-none');
          $sendErrorMsg.classList.add('d-none');
          $sendErrorFieldsMsg.classList.add('d-none');
          $modalJob.classList.remove('d-none');
          $title.innerHTML = this.dataset.title;
          $titleMail.value = this.dataset.title;
        });
      }


    }


  };
  export default openHelpModalFn;
  //$sendSuccessMsg.classList.remove( 'd-none' );
