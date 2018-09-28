'use strict';
(function () {
  var WIZARDS_NUMBER = 4;
  var wizardsList = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizardData) {
    var wizard = wizardTemplate.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;
    return wizard;
  };

  var renderWizards = function (wizardsData) {
    var fragment = document.createDocumentFragment();
    var shuffledWizards = window.utils.shuffleArray(wizardsData);
    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderWizard(shuffledWizards[i]));
    }
    wizardsList.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.makeXhrRequest(renderWizards, window.utils.errorHandler, 'GET');
})();
