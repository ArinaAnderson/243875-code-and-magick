'use strict';
(function () {
  var xhr;
  var xhrLoadHandler = function (cb1, cb2, resp) {
    if (xhr.status === 200) {
      cb1(resp);
    } else {
      cb2('Статус отправки формы: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var getXhrReady = function (method, address, info) {
    xhr.open(method, address);
    xhr.send(info);
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';
      xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        xhrLoadHandler(onLoad, onError);
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      getXhrReady('POST', URL, data);
    },
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        xhrLoadHandler(onLoad, onError, xhr.response);
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      getXhrReady('GET', URL);
    },
  };
})();
