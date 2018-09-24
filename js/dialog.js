'use strict';
// Модуль dialog.js
(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setup = document.querySelector('.setup');
  var setupOpenBtn = document.querySelector('.setup-open');
  var setupCloseBtn = setup.querySelector('.setup-close');
  var setupUser = document.querySelector('[name = username]');

  var wizardSetup = document.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('[name = coat-color]');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('[name = eyes-color]');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('[name = fireball-color]');

  var countsOfElemColors = {
    'coat': 0,
    'eyes': 0,
    'fireball': 0
  };

  var changeColor = function (wizaerdElem, colorList, countKey, styleProperty) {
    countsOfElemColors[countKey]++;
    if (countsOfElemColors[countKey] === colorList.length) {
      countsOfElemColors[countKey] = 0;
    }
    var value = colorList[countsOfElemColors[countKey]];
    wizaerdElem.style[styleProperty] = value;
    return value;
  };

  var setupEscPressHandler = function (evt) {
    window.utils.isEscPress(evt, closeSetup);
  };


  var openSetup = function () {
    setup.classList.remove('hidden');
    setupUser.addEventListener('focus', function () { // определить состояние фокуса
      document.removeEventListener('keydown', setupEscPressHandler);
    });
    setupUser.addEventListener('blur', function () {
      document.addEventListener('keydown', setupEscPressHandler);
    });
    document.addEventListener('keydown', setupEscPressHandler);

    wizardCoat.addEventListener('click', function () {
      wizardCoatInput.value = changeColor(wizardCoat, COAT_COLORS, 'coat', 'fill');
    });
    wizardEyes.addEventListener('click', function () {
      wizardEyesInput.value = changeColor(wizardEyes, EYES_COLORS, 'eyes', 'fill');
    });
    wizardFireball.addEventListener('click', function () {
      wizardFireballInput.value = changeColor(wizardFireball, FIREBALL_COLORS, 'fireball', 'backgroundColor');
    });
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', setupEscPressHandler);
  };

  setupOpenBtn.addEventListener('click', function () {
    openSetup();
  });
  setupOpenBtn.addEventListener('keydown', function (evt) {
    window.utils.isEnterPress(evt, openSetup);
  });
  setupCloseBtn.addEventListener('click', function () {
    closeSetup();
  });
  setupCloseBtn.addEventListener('keydown', function (evt) {
    window.utils.isEnterPress(evt, closeSetup);
  });

  document.querySelector('.setup-similar').classList.remove('hidden');
})();
