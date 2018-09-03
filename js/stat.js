'use strict';

// infoTable характеристики
var startX = 100;
var startY = 10;
var infotableWidth = 420;
var infotableHeight = 270;
var topTableColor = 'white';
var outlineColor = 'rgba(0, 0, 0, 1)';
var bottomTableColor = 'rgba(0, 0, 0, 0.7)';
var bottomTableOffset = 10;
var lineWidth = 1;
var paddingTop = 18;

// text характеристики
var textList = ['Ура вы победили!', 'Список результатов!'];
var font  = 'PT Mono';
var fontSize = 16;
var textColor = 'black';
var lineHeight = fontSize * 1.375;//опытным путем определена высота строки: 22px = 16px * 1.375
var textLines = textList.length;
var textMarginLeft = 20;

// данные и расчеты для построения гистограммы
var topGap  = paddingTop + lineHeight * textLines;
var barChartMarginLeft = 40;//между левым краем облака и первой колонкой
var barChartMarginTop = 5;
var columnWidth = 40;
var columnMarginRight = 50;
var columnMarginTop = 0;//между текстом времени и самой колонкой
var columnMaxHeight = 150;

// голубой цвет
var blueHue = 216;
var blueLightness = 50;

// функция поиска максимального значения и функция отрисовки облака
function getMax(list) {
  var max = list[0];
  for (var i = 1; i < list.length; i++) {
    if (list[i] > max) {
      max = list[i];
    }
  }
  return max;
};

function drawInfotable(ctx) {
  ctx.lineWidth = lineWidth;
  ctx.fillStyle = bottomTableColor;
  ctx.fillRect(startX + bottomTableOffset, startY + bottomTableOffset, infotableWidth, infotableHeight);
  ctx.fillStyle = outlineColor;
  ctx.fillRect(startX - lineWidth, startY - lineWidth, infotableWidth + lineWidth*2, infotableHeight + lineWidth*2);
  ctx.fillStyle = topTableColor;
  ctx.fillRect(startX, startY, infotableWidth, infotableHeight);
};

window.renderStatistics = function(ctx, names, times) {
  drawInfotable(ctx);

  // добавление текста
  ctx.fillStyle = textColor;
  ctx.font = '' + fontSize + 'px' + ' ' + font;
  var lines = 1;
  for (var i = 0; i < textList.length; i++) {
  	ctx.fillText(textList[i], startX + textMarginLeft, paddingTop + lineHeight * lines);
  	lines++;
  }

  // создание массива отличимых цветов голубого с разной насыщенностью
  var saturationChangeSpan = 100 / (names.length - 1);// игрок 'Вы' исключен, тк у него красный цвет
  var blueSaturations = [];
  var saturation = 0;
  for (var i = 0; i < names.length - 1; i++) {
  	if (i === names.length - 1) {
  	  saturation = 100;
  	} else {
  	  saturation += saturationChangeSpan;
  	}
  	blueSaturations.push('hsl(' + blueHue + ', ' + saturation + '%' + ', ' + blueLightness + '%)');
  }

  // построение гистограммы
  var maxTime = getMax(times);
  var totalGap = 0;// расстояние слева от новой колонки
  var countOfColumns = 1;// red column 'Вы'
  var columnsBottomY = startY + topGap + barChartMarginTop + lineHeight + columnMarginTop + columnMaxHeight;

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
      totalGap = barChartMarginLeft;
    } else {
      var randomSaturation = blueSaturations[Math.floor(Math.random() * blueSaturations.length)]
  	  blueSaturations.splice(blueSaturations.indexOf(randomSaturation), 1);
  	  ctx.fillStyle = randomSaturation;
      totalGap = barChartMarginLeft + countOfColumns * (columnWidth + columnMarginRight);
      countOfColumns++;
    }

    var columnHeight = columnMaxHeight * times[i] / maxTime;
    var columnY  = columnsBottomY - columnHeight;
    ctx.fillRect(startX + totalGap, columnY, columnWidth, columnHeight);
    var textTimeY = columnsBottomY - columnHeight - barChartMarginTop;
    ctx.fillStyle = textColor;
    ctx.fillText(parseInt(times[i]), startX + totalGap, textTimeY);
    ctx.fillText(names[i], startX + totalGap, columnsBottomY + lineHeight);
  }
}
