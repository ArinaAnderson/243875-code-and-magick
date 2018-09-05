'use strict';

// infoTable характеристики
var START_X = 100;
var START_Y = 10;
var cloudParams = {
  WIDTH: 420,
  HEIGHT: 270,
  topColor: 'white',
  bottomColor: 'rgba(0, 0, 0, 0.7)',
  outlineColor: 'black',
  offset: 10,
  lineWidth: 1,
  paddingTop: 5
};

// text характеристики СОЗДАТЬ ОБЪЕКТ ТЕКСТ headingTextParams + метод построения нарезки текста
var textParams = {
  text: 'Ура вы победили! Список результатов!',
  family: 'PT Mono',
  size: 16,
  color: 'black',
  lineHeight: 1.375,
  marginLeft: 20,
  maxLineWidth: 200
};

// barchart характеристики
var chartParams = {
  chartMarginLft: 40,
  chartMarginTp: 30,
  barWidth: 40,
  barMaxHeight: 150,
  barMarginRght: 50,
  barMarginTp: 10,
  hue: 216,
  lightness: 50,
  getSaturation: function () {
    var value = Math.floor(Math.random() * 100);
    return value;
  }
};

// функция отрисовки облака
function drawInfotable(ctx) {
  ctx.lineWidth = cloudParams.lineWidth;
  ctx.fillStyle = cloudParams.bottomColor;
  ctx.fillRect(START_X + cloudParams.offset, START_Y + cloudParams.offset, cloudParams.WIDTH, cloudParams.HEIGHT);
  ctx.fillStyle = cloudParams.outlineColor;
  ctx.fillRect(START_X - cloudParams.lineWidth, START_Y - cloudParams.lineWidth, cloudParams.WIDTH + cloudParams.lineWidth * 2, cloudParams.HEIGHT + cloudParams.lineWidth * 2);
  ctx.fillStyle = cloudParams.topColor;
  ctx.fillRect(START_X, START_Y, cloudParams.WIDTH, cloudParams.HEIGHT);
}

// функция добавления текста
function renderHeading(ctx, text, fontSize, lineHeight, maxWidth) {
  var textArray = text.split(' ');
  var count = textArray.length;
  var addition = fontSize * lineHeight;
  var line = '';
  for (var i = 0; i < count; i++) {
    var check = line + textArray[i] + ' ';
    var checkWidth = ctx.measureText(check).width;
    if (checkWidth > maxWidth) {
      ctx.fillText(line, START_X + textParams.marginLeft, START_Y + cloudParams.paddingTop + addition);
      line = textArray[i] + ' ';
      addition += fontSize * lineHeight;
    } else {
      line = check;
    }
  }
  ctx.fillText(line.trim(), START_X + textParams.marginLeft, START_Y + cloudParams.paddingTop + addition);
}

// функция поиска максимума
function getMax(list) {
  var max = list[0];
  for (var i = 1; i < list.length; i++) {
    if (list[i] > max) {
      max = list[i];
    }
  }
  return max;
}

// функция построения колонки гистаграммы
function buildBar(ctx, x, bottom, value, maxValue, text) {
  var barHeight = chartParams.barMaxHeight * value / maxValue;
  ctx.fillRect(x, bottom - barHeight, chartParams.barWidth, barHeight);
  ctx.fillStyle = textParams.color;
  ctx.fillText(Math.floor(value), x, bottom - barHeight - chartParams.barMarginTp);
  ctx.fillText(text, x, bottom + textParams.lineHeight * textParams.size);
}

window.renderStatistics = function (ctx, names, times) {
  // построение облака
  drawInfotable(ctx);

  // построение текста
  ctx.fillStyle = textParams.color;
  ctx.font = textParams.size + 'px' + ' ' + textParams.family;
  renderHeading(ctx, textParams.text, textParams.size, textParams.lineHeight, textParams.maxLineWidth);

  // построение гистограммы
  var maxTime = getMax(times);
  var chartY = START_Y + cloudParams.paddingTop + textParams.lineHeight * textParams.size * Math.ceil(textParams.text.length / textParams.maxLineWidth) + chartParams.chartMarginTp;
  var chartX = START_X + chartParams.chartMarginLft;
  var chartBottom = chartY + textParams.lineHeight * textParams.size + chartParams.barMarginTp + chartParams.barMaxHeight;

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = names[i] === 'Вы' ? 'red' : 'hsl(' + chartParams.hue + ', ' + chartParams.getSaturation() + '%' + ', ' + chartParams.lightness + '%)';
    var barX = chartX + i * (chartParams.barWidth + chartParams.barMarginRght);
    buildBar(ctx, barX, chartBottom, times[i], maxTime, names[i]);
  }
};
