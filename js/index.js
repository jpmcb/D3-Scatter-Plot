'use strict';

var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
var myData;
var speedData = [];

function runData() {
  //d3 code to be run after ajax is done
  for (var i = 0; i < myData.length; i++) {
    speedData.push(myData[i]["Seconds"]);
  }

  console.log(speedData);

  var svg = d3.select('div.root').append('svg').attr('id', 'root-svg');

  var tooltip = d3.selectAll('div.hover').data(speedData).enter().append('div').attr('class', function (d, i) {
    return 'hover' + i + ' ' + 'hover';
  }).style('display', 'none').html(function (d, i) {
    return '<h3>' + myData[i]['Name'] + '</h3><p><strong>Time:</strong> ' + myData[i]['Time'] + '<br><strong>Place:</strong> ' + myData[i]['Place'] + '<br>' + myData[i]['Doping'] + '</p>';
  });

  svg.append('line') //x-axis line and text
    .attr('id', 'xaxis')
    .attr('x1', '10')
    .attr('y1', '490')
    .attr('x2', '890')
    .attr('y2', '490');

  svg.append('text')
    .attr('id', 'xaxis-text')
    .attr('x', '427')
    .attr('y', '480')
    .text('Speed');

  svg.append('text')
    .attr('class', 'axis-desc')
    .attr('x', '840')
    .attr('y', '475')
    .text('Fastest');

  svg.append('line') //y-axis line and text
    .attr('id', 'yaxis')
    .attr('x1', '10')
    .attr('y1', '10')
    .attr('x2', '10')
    .attr('y2', '490');

  svg.append('text')
    .attr('id', 'yaxis-text')
    .attr('x', '20')
    .attr('y', '250')
    .text('Ranking');

  svg.append('text')
    .attr('class', 'axis-desc')
    .attr('x', '25')
    .attr('y', '25')
    .text('First');

  svg.append('text')
    .attr('class', 'axis-desc')
    .attr('x', '20')
    .attr('y', '480')
    .text('0');

  svg.append('circle') //circles & text for legend of graph
    .attr('cx', '60')
    .attr('cy', '60')
    .attr('r', '5')
    .attr('fill', 'purple');

  svg.append('text')
    .attr('x', '70')
    .attr('y', '64')
    .text('Doping Allegations');

  svg.append('circle')
    .attr('cx', '60')
    .attr('cy', '80')
    .attr('r', '5');

  svg.append('text')
    .attr('x', '70')
    .attr('y', '86')
    .text('No Doping Allegations');

  svg.selectAll('circle.data') //data points across scatter plot graph
    .data(speedData)
      .enter().append('circle')
      .attr('class', 'data')
      .attr('cx', function (d) {
        return (2400 - d) * 4.5;
      }).attr('cy', function (d, i) {
        return myData[i]['Place'] * 12 + 15;
      }).attr('r', '5')
      .attr('fill', function (d, i) {
        if (myData[i]['Doping'] === '') {
          return 'black';
        } else {
          return 'purple';
        }

        //event handlers for tooltips to appear just below mouse and to the right
      }).on('mouseover', function (d, i) {
        return $('.hover' + i).css('display', 'inline-block').css('top', event.pageY + 15).css('left', event.pageX + 15);
      }).on('mouseout', function (d, i) {
        return $('.hover' + i).css('display', 'none');
      });
}

$.getJSON(url, function (data) {
  myData = data;
  console.log(myData);

  runData();
});