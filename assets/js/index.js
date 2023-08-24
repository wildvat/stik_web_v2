import generalFn from './general';
import countDownFn from './countdown';
import toggleFn from './toggle';
import sendMailFn from './send-mail';
import exploreFn from './explore';
import updateLinkImagesSvgFn from './update_link_images';
import sendReserveFn from './send-reserve';

/*
import moreShowFn from './js/more-show';
import closeModalFn from './js/close-modal';
import openJobModalFn from './js/open-job-modal';
import openHelpModalFn from './js/open-help-modal';
import openInteractoinsListModalFn from './js/open-interactions-list-modal';
*/
(function () {
    generalFn();
    countDownFn();
    toggleFn();
    sendMailFn();
    sendReserveFn();
    exploreFn();
    updateLinkImagesSvgFn();
    /**
     moreShowFn();
     closeModalFn();
     openJobModalFn();
     openHelpModalFn();
     openInteractoinsListModalFn();
     **/
})();
