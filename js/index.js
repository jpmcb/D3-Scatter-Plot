'use strict';

var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
var myData;
var speedData = [];
var dopingData = [];
var nationData = [{
  'Italy': {
    'Name': 'Italy',
    'Doping': 5,
    'No Doping': 1 } }, { 'USA': {
    'Name': 'USA',
    'Doping': 4,
    'No Doping': 0 } }, { 'Germany': {
    'Name': 'Germany',
    'Doping': 4,
    'No Doping': 0 } }, { 'Spain': {
    'Name': 'Spain',
    'Doping': 5,
    'No Doping': 2 } }, { 'Switzerland': {
    'Name': 'Switzerland',
    'Doping': 1,
    'No Doping': 0 } }, { 'Denmark': {
    'Name': 'Denmark',
    'Doping': 3,
    'No Doping': 0 } }, { 'France': {
    'Name': 'France',
    'Doping': 4,
    'No Doping': 0 } }, { 'Ukraine': {
    'Name': 'Ukraine',
    'Doping': 0,
    'No Doping': 1 } }, { 'Columbia': {
    'Name': 'Columbia',
    'Doping': 0,
    'No Doping': 2 } }, { 'Portugal': {
    'Name': 'Portugal',
    'Doping': 1,
    'No Doping': 0 } }, { 'Russia': {
    'Name': 'Russia',
    'Doping': 1,
    'No Doping': 2 } }];

function runData() {
  //d3 code to be run after ajax is done
  for (var i = 0; i < myData.length; i++) {
    speedData.push(myData[i]["Seconds"]);
    dopingData.push(myData[i]["Doping"]);
  }

  console.log(nationData[1][Object.keys(nationData[1])].Name);

  var svg = d3.select('div.root').append('svg').attr('id', 'root-svg');
  var nextSvg = d3.select('div.root2').append('svg').attr('id', 'doping-svg');
  var lastSvg = d3.select('.root3').append('svg').attr('id', 'nation-svg');

  var nationTooltip = d3.selectAll('div.nation-hover').data(Object.keys(nationData)).enter().append('div').attr('id', function (d, i) {
    return d;
  }).attr('class', 'nation-hover').style('display', 'none').html(function (d, i) {
    return '<h1>' + nationData[d][Object.keys(nationData[d])]['Name'] + '</h1>';
  });

  var tooltip = d3.selectAll('div.hover').data(speedData).enter().append('div').attr('class', function (d, i) {
    return 'hover' + i + ' ' + 'hover';
  }).style('display', 'none').html(function (d, i) {
    return '<h3>' + myData[i]['Name'] + '</h3><p><strong>Time:</strong> ' + myData[i]['Time'] + '&nbsp;&nbsp;&nbsp;&nbsp;  <strong>Place:</strong> ' + myData[i]['Place'] + '<br>' + myData[i]['Doping'] + '</p>';
  });

  // FIRST GRAPH
  nextSvg.append('text').attr('x', 420).attr('y', 60).style('fill', 'white').style('letter-spacing', '2px').text("These guys didn't").transition().duration(1500).delay(8000).attr('x', 760).style('fill', 'black');

  nextSvg.append('text').attr('x', 420).attr('y', 60).style('fill', 'white').style('letter-spacing', '2px').text('These guys doped').transition().duration(1500).delay(7000).attr('x', 90).style('fill', 'black');

  nextSvg.append('text').attr('x', '410').attr('y', '60').style('fill', '#d3d3d3').style('letter-spacing', '3px').text('Scroll to see more').transition().duration(2000).delay(9500).attr('y', 220).style('fill', 'black');
  //.each('end', wave);

  nextSvg.selectAll('circle.doped') //data points across scatter plot graph
  .data(dopingData).enter().append('circle').attr('class', 'doped').attr('cx', 490).attr('cy', 125).attr('fill', 'white').on('mouseover', function (d, i) {
    return $('.hover' + i).css('display', 'inline-block').css('top', event.pageY + 25).css('left', event.pageX - 180);
  }).on('mouseout', function (d, i) {
    return $('.hover' + i).css('display', 'none');
  }).transition().duration(4000).delay(function (d, i) {
    return i * 100 + 1500;
  }).attr('cx', function (d, i) {
    if (d === '') {
      return i * 4 + 730;
    } else {
      return i * 4 + 90;
    }
  }).attr('cy', function (d, i) {
    return Math.random() * 50 + 100;
  }).attr('r', '4').attr('fill', function (d, i) {
    if (d === '') {
      return 'black';
    } else {
      return 'purple';
    }
  });

  // SECOND GRAPH

  svg.append('text').attr('x', 230).attr('y', 40).style('font-size', '2.2em').text('Top Tour De France Times');

  svg.append('line') //x-axis line and text
  .attr('id', 'xaxis').attr('x1', '10').attr('y1', '490').attr('x2', '890').attr('y2', '490');

  svg.append('text').attr('id', 'xaxis-text').attr('x', '427').attr('y', '480').text('Speed');

  svg.append('text').attr('class', 'axis-desc').attr('x', '840').attr('y', '475').text('Fastest');

  svg.append('line') //y-axis line and text
  .attr('id', 'yaxis').attr('x1', '10').attr('y1', '10').attr('x2', '10').attr('y2', '490');

  svg.append('text').attr('id', 'yaxis-text').attr('x', '20').attr('y', '250').text('Ranking');

  svg.append('text').attr('class', 'axis-desc').attr('x', '25').attr('y', '25').text('First');

  svg.append('text').attr('class', 'axis-desc').attr('x', '20').attr('y', '480').text('Slowest');

  svg.append('circle') //circles & text for legend of graph
  .attr('cx', '60').attr('cy', '60').attr('r', '5').attr('fill', 'purple');

  svg.append('text').attr('x', '70').attr('y', '64').text('Doping Allegations');

  svg.append('circle').attr('cx', '60').attr('cy', '80').attr('r', '5');

  // FIRST RECT TO FADE IN
  nextSvg.append('rect').attr('x', '350').attr('y', '25').attr('rx', '10').attr('ry', '10').attr('id', 'rect-fadeOut').attr('class', 'fadeIn-fadeOut').attr('width', '285').attr('height', '140');

  nextSvg.append('text').attr('x', '395').attr('y', '53').attr('id', 'rect-text3').attr('class', 'fadeIn-fadeOut').text('These are the top 35');

  nextSvg.append('text').attr('x', '362').attr('y', '100').attr('id', 'rect-text4').attr('class', 'fadeIn-fadeOut').text('Tour De France times');

  nextSvg.append('text').attr('x', '360').attr('y', '140').attr('id', 'rect-text5').attr('class', 'fadeIn-fadeOut').text('from the worlds best cycle racers');

  // SECOND RECT TO FADE IN AND STAY
  svg.append('rect').attr('x', '500').attr('y', '225').attr('rx', '15').attr('ry', '15').attr('id', 'rect-desc').attr('class', 'fadeIn-rect').attr('width', '230').attr('height', '160');

  svg.append('text').attr('x', '530').attr('y', '350').attr('id', 'rect-text1').attr('class', 'fadeIn-rect').text('of the top pros have doped');

  svg.append('text').attr('x', '555').attr('y', '370').attr('id', 'rect-text2').attr('class', 'fadeIn-rect').text('or been accused of doping');

  svg.append('text').attr('x', '518').attr('y', '310').attr('id', 'rect-80').attr('class', 'fadeIn-rect').text('80%');

  //THIRD RECT TO FADE IN
  svg.append('rect').attr('x', '500').attr('y', '170').attr('rx', '20').attr('ry', '20').attr('id', 'rect-fade').attr('class', 'fadeIn-3').attr('width', '230').attr('height', '40');

  svg.append('text').attr('x', '513').attr('y', '195').attr('id', 'rect-hover').attr('class', 'fadeIn-3').text('Hover a plot-point to see details');

  svg.append('text').attr('x', '70').attr('y', '86').text('No Doping Allegations');

  svg.selectAll('circle.data') //data points across scatter plot graph
  .data(speedData).enter().append('circle').attr('class', 'data').attr('id', function (d) {
    return d;
  }).attr('cx', function (d) {
    return (2400 - d) * 4.5;
  }).attr('cy', function (d, i) {
    return myData[i]['Place'] * 12 + 15;
  }).attr('r', '5').attr('fill', function (d, i) {
    if (myData[i]['Doping'] === '') {
      return 'black';
    } else {
      return 'purple';
    }

    //event handlers for tooltips to appear just below mouse and to the right
  }).on('mouseover', function (d, i) {
    console.log(event.target.id);
    if (event.target.id < 2320) {
      return $('.hover' + i).css('display', 'inline-block').css('top', event.pageY + 25).css('left', event.pageX - 180);
    } else {
      return $('.hover' + i).css('display', 'inline-block').css('top', event.pageY - 125).css('left', event.pageX + 50);
    }
  }).on('mouseout', function (d, i) {
    return $('.hover' + i).css('display', 'none');
  });

  // THIRD GRAPH
  lastSvg.append('text').attr('x', 360).attr('y', 50).text('Which countries pros dope the most?').style('font-size', '2em').style('font-spacing', '2px');

  var myG = lastSvg.append('g').attr('x', '470').attr('y', '345').attr('width', '250').attr('height', '50').on('click', runNations);

  myG.append('rect').attr('x', 500).attr('y', 350).attr('rx', '10').attr('ry', '10').attr('width', '210').attr('height', '40').style('fill', '#250535');

  myG.append('text').attr('x', 565).attr('y', 375).text('Click to see').style('fill', 'white');

  var constant = 0;

  function runNations() {
    myG.select('text').attr('x', 538).text('Hover to see Details');

    myG.select('rect').style('fill', '#1d0326');

    lastSvg.selectAll('circle.nation').data(nationData).enter().append('circle').attr('class', 'nation').attr('cx', -50).attr('cy', -50).attr('r', 5).on('mouseover', function (d, i) {
      return $('#' + i).css('display', 'inline-block').css('top', event.pageY + 25).css('left', event.pageX - 180);
    }).on('mouseout', function (d, i) {
      return $('#' + i).css('display', 'none');
    }).transition().duration(3000).delay(function (d, i) {
      return i * 100;
    }).attr('fill', function (d, i) {
      var myKeys = Object.keys(d);
      if (d[myKeys[0]].Doping == 0) {
        return 'black';
      } else {
        return 'purple';
      }
    }).attr('r', function (d, i) {
      var myKeys = Object.keys(d);
      if (d[myKeys[0]].Doping === 0) {
        return 5;
      } else {
        return d[myKeys[0]].Doping * 15;
      }
    }).attr('cx', function (d, i) {
      var myKeys = Object.keys(d);
      var radius = d[myKeys[0]].Doping * 12;

      var placement = constant + radius;
      constant += radius * 2 + 25;
      return placement + 140;
    }).attr('cy', function (d, i) {
      //var myKeys = Object.keys(d);
      //return (d[myKeys[0]].Doping * 12) * 50;
      return 200;
    });
  };
}

$.getJSON(url, function (data) {
  myData = data;
  //console.log(myData);
});

$(document).ready(function () {
  $(this).scrollTop();
  window.resizeTo(window.innerWidth, 800);
  $('#load-button').delay(2000).fadeIn(1000).click(function () {

    $('#load-button').fadeOut(500);
    $('#intro').fadeOut(500);
    $('#definition').delay(1000).fadeIn(500).delay(2500);
    $('.first-data').delay(4000).fadeIn(1000);
    window.setTimeout(runData, 4000);
    $(window).scroll(function () {
      $('.fadeIn-data').delay(1000).fadeIn(500);

      var i = 2391;
      var interval = window.setInterval(function () {
        if (i < 2210) {
          window.clearInterval(interval);
        }

        if ($('#' + i)) {
          $('#' + i).delay(15).fadeIn(250);
        }

        i--;
      }, 30);

      $('.last-data').delay(1000).fadeIn(1000);
      $('.fadeIn-fadeOut').delay(250).fadeIn(750);
      $('.fadeIn-rect').delay(6000).fadeIn(250);
      $('.fadeIn-3').delay(8500).fadeIn(500);
    });
  });
});