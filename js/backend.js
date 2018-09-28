'use strict';
(function () {
  var SUCCESS_XHR_STATE = 200;
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var URL_POST = 'https://js.dump.academy/code-and-magick';

  window.backend = {
    makeXhrRequest: function (onLoad, onError, method, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_XHR_STATE) {
          onLoad(xhr.response);
        } else {
          onError('Статус запроса: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      var address = method === 'GET' ? URL_GET : URL_POST;
      xhr.open(method, address);
      xhr.send(data);
    }
  };
})();
