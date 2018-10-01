'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 1000;
  var wizardsItems = {
    'coat': {color: '', count: 0, timeout: null},
    'eyes': {color: '', count: 0, timeout: null},
    'fireball': {color: '', count: 0, timeout: null}
  };
  var loadedList = [];

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === wizardsItems['coat'].color) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardsItems['eyes'].color) {
      rank += 1;
    }
    return rank;
  };

  var compareNames = function (left, right) {
    if (left < right) {
      return -1;
    } else if (left > right) {
      return 1;
    } else {
      return 0;
    }
  }

  var successHandler = function (data) {
    loadedList = data;
    window.processWizards.update(loadedList);
  };
  window.backend.load(successHandler, window.utils.errorHandler);

  window.processWizards = {
    update: function () {
      window.render(loadedList.slice().sort(function (left, right) {
        var rankDif = getRank(right) - getRank(left);
        if (rankDif === 0) {
          rankDif = compareNames(left.name, right.name);
        }
        return rankDif;
      }));
    },
    changeColor: function (wizardElem, colorList, wizItem, styleProperty) { 
      wizardsItems[wizItem].count++;
      if (wizardsItems[wizItem].count === colorList.length) {
        wizardsItems[wizItem].count = 0;
      }
      var value = colorList[wizardsItems[wizItem].count];
      wizardElem.style[styleProperty] = value;
      wizardsItems[wizItem].color = value;console.log(wizardsItems[wizItem].timeout);
      window.utils.debounce(window.processWizards.update, wizardsItems[wizItem].timeout, DEBOUNCE_INTERVAL);

      return value;
    }
  };
})();
