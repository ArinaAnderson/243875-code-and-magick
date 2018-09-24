'use strict';

// Модуль wizards-data.js
(function () {
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  window.wizardsData = function () {
    return {
      name: NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + SURNAMES[Math.floor(Math.random() * SURNAMES.length)],
      coatColor: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
      eyesColor: EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)],
    };
  };
})();
