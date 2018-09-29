'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.utils = {
    isEscPress: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    shuffleArray: function (list) {
      for (var i = list.length - 1; i > 0; i--) {
        var randomNum = Math.floor(Math.random() * (i + 1));
        var randomElement = list[randomNum];
        list[randomNum] = list[i];
        list[i] = randomElement;
      }
      return list;
    },
    errorHandler: function (errorMessage) { // util
      var node = document.createElement('div');
      node.classList.add('error-message');
      node.textContent = errorMessage;
      document.body.appendChild(node);
    }
  };
})();
