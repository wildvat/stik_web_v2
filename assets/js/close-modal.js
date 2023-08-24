  const closeModalFn = function () {
    const $closeModal = document.getElementById('closeModal');
    const $modal = document.getElementsByClassName('modalContent');
    if ($closeModal && $modal) {
      $closeModal.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        for (let index = 0; index < $modal.length; index++) {
          $modal[index].classList.add('d-none');

        }

      });
    }

  };
  export default closeModalFn;
