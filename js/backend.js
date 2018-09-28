'use strict';
(function () {
  var SUCCESS_RESP_STATUS = 200;
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var URL_POST = 'https://js.dump.academy/code-and-magick';

  var createXhrRequest = function (cb1, cb2) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_RESP_STATUS) {
        cb1(xhr.response);
      } else {
        cb2('Статус запроса: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      cb2('Произошла ошибка соединения');
    });
    return xhr;
  };

  window.backend = {
    save: function (onLoad, onError, data) {
      var xhr = createXhrRequest(onLoad, onError);
      xhr.open('POST', URL_POST);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = createXhrRequest(onLoad, onError);
      xhr.open('GET', URL_GET);
      xhr.send();
    }
  };
})();
