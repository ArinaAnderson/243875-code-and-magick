'use strict';
// Модуль dialog.js
(function () {
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
    window.util.escPress(evt, closeSetup);
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
      wizardCoatInput.value = changeColor(wizardCoat, window.colours.COAT_COLORS, 'coat', 'fill');
    });
    wizardEyes.addEventListener('click', function () {
      wizardEyesInput.value = changeColor(wizardEyes, window.colours.EYES_COLORS, 'eyes', 'fill');
    });
    wizardFireball.addEventListener('click', function () {
      wizardFireballInput.value = changeColor(wizardFireball, window.colours.FIREBALL_COLORS, 'fireball', 'backgroundColor');
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
    window.util.enterPress(evt, openSetup);
  });
  setupCloseBtn.addEventListener('click', function () {
    closeSetup();
  });
  setupCloseBtn.addEventListener('keydown', function (evt) {
    window.util.enterPress(evt, closeSetup);
  });

  document.querySelector('.setup-similar').classList.remove('hidden');
})();
