  const openJobModalFn = function () {
    const $modalJob = document.getElementById('modalJob');
    const $modalJobTrigger = document.getElementsByClassName('modalJobTrigger');

    if ($modalJob && $modalJobTrigger) {
      for (let i = 0; i < $modalJobTrigger.length; i++) {
        $modalJobTrigger[i].addEventListener('click', function (e) {
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
  export default openJobModalFn;
  //$sendSuccessMsg.classList.remove( 'd-none' );
