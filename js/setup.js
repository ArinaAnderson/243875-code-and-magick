'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var wizardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия','Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizardsNumber = 4;
var wizards = [];

// создание объекта случайных характеристик мага
function createWizardData() {
  var wizard = {
    name: NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + SURNAMES[Math.floor(Math.random() * SURNAMES.length)],
    coatColor: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
    eyesColor: EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)],
  };
  return wizard;
}

// создание мага
function renderWizard(wizardData) {
  var wizard = wizardTemplate.cloneNode(true);
  wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
  wizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

  return wizard;
}

// заполнения фрагмента магами из массива wizards
function renderWizards(wizardsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsData.length; i++) {
    fragment.appendChild(renderWizard(wizardsData[i]));
  }
  wizardsList.appendChild(fragment);
}

for (var i = 0; i < wizardsNumber; i++) {
  wizards.push(createWizardData());
}

renderWizards(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');
