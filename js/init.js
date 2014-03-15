(function() {
  'use strict';

  var onLoad = function() {
    var ui = new SideMMyDeskUI();
    ui.onLoad();

    var elem = document.getElementById('cssFilterJsBlur');
    elem.addEventListener('change', function() {
      cssFilter('#sidem-mydesk').blur(this.value + 'px');
    });
    cssFilter('#sidem-mydesk').blur(elem.value + 'px');
  };

  window.addEventListener('load', onLoad, false);
})();
