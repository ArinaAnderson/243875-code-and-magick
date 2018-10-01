'use strict';
(function () {
  var wizardsList = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizardData) {
    var wizard = wizardTemplate.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;
    return wizard;
  };

  window.render = function (wizardsData) {
    wizardsList.innerHTML = '';
    var wizardsNumber = wizardsData.length > 4 ? 4 : wizardsData.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsNumber; i++) {
      fragment.appendChild(renderWizard(wizardsData[i]));
    }
    wizardsList.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
