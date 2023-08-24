  //todo: check if works and finish
  const openInteractoinsListModalFn = function () {
    const $modalContentInteractionsList = document.getElementById('modalContentInteractionsList');
    const $modalInteractionsListTrigger = document.getElementsByClassName('modalInteractionsListTrigger');

    if ($modalInteractionsListTrigger && $modalContentInteractionsList) {
      for (let i = 0; i < $modalInteractionsListTrigger.length; i++) {
        $modalInteractionsListTrigger[i].addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          $modalContentInteractionsList.classList.remove('d-none');
        });
      }


    }


  };
  export default openInteractoinsListModalFn;
  //$sendSuccessMsg.classList.remove( 'd-none' );
