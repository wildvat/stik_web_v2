const sendReserveFn = function () {
    const $sendErrorFieldsMsg = document.getElementById('sendErrorFileds');
    const $sendErrorMsg = document.getElementById('sendError');
    const $sendSuccessMsg = document.getElementById('sendSuccess');
    const $buttonSendMail = document.getElementById('sendReserveMail');
    if ($buttonSendMail) {
        $buttonSendMail.addEventListener('click', function (e) {
            $buttonSendMail.classList.add('disabled');
            $sendSuccessMsg.classList.add('d-none');
            $sendErrorMsg.classList.add('d-none');
            $sendErrorFieldsMsg.classList.add('d-none');
            e.preventDefault();
            e.stopPropagation();
            try {
                const formElement = this.parentElement.parentElement;
                const formData = new FormData(formElement);
                const email = formData.getAll('email')[0].trim();
                const username = formData.getAll('username')[0].trim();
                const password = formData.getAll('password')[0].trim();
                const password_repeat = formData.getAll('password_repeat')[0].trim();
                const privacy = document.getElementsByName('privacy')[0].checked;

                if (!email || !username || !privacy || !password || !password_repeat || password_repeat !== password || !validateEmail(email)) {
                    $buttonSendMail.classList.remove('disabled');
                    $sendErrorFieldsMsg.classList.remove('d-none');
                    return false;
                }
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://app.stik.world/api/reserve/username');
                //xhr.setRequestHeader( 'Content-Type', 'application/json' );
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
                xhr.onreadystatechange = function (response) {
                    if (xhr.readyState === 4) {
                        $buttonSendMail.classList.remove('disabled');
                        if (xhr.status === 200) {
                            $sendSuccessMsg.classList.remove('d-none');
                            formElement.reset();
                            window.location = formElement.dataset.redirect;
                            return true;
                        } else {
                            window.console.log('error send');
                            $sendErrorMsg.classList.remove('d-none');
                            return false;
                        }
                    }
                };
            } catch (e) {
                $buttonSendMail.classList.remove('disabled');
                $sendErrorFieldsMsg.classList.remove('d-none');
                return false;
            }

        });
    }


    function validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }

};
export default sendReserveFn;
