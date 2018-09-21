'use strict';

// Модуль рендеринга магов wizards-rendering.js
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
  var WIZARDS_NUMBER = 4;
  var wizardsList = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function createWizardData() {
    return {
      name: NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + SURNAMES[Math.floor(Math.random() * SURNAMES.length)],
      coatColor: window.colours.COAT_COLORS[Math.floor(Math.random() * window.colours.COAT_COLORS.length)],
      eyesColor: window.colours.EYES_COLORS[Math.floor(Math.random() * window.colours.EYES_COLORS.length)],
    };
  }

  function renderWizard(wizardData) {
    var wizard = wizardTemplate.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;
    return wizard;
  }

  function createWizardsList(number) {
    var wizards = [];
    for (var i = 0; i < number; i++) {
      wizards.push(createWizardData());
    }
    return wizards;
  }

  function renderWizards(wizardsData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsData.length; i++) {
      fragment.appendChild(renderWizard(wizardsData[i]));
    }
    wizardsList.appendChild(fragment);
  }

  var wizards = createWizardsList(WIZARDS_NUMBER);
  renderWizards(wizards);
})();
