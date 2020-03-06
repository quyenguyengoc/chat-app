(function($) {
  'use strict';
  function alert() {
    if ($('div#flash-content').length) {
      let msg = $('div#flash-content').text();
      let type = $('div#flash-type').text();
      alertify.notify(msg, type, 5)
    }
  }
  alert();
})(jQuery);
