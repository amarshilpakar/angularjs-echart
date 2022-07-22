app.controller('chartController', ['$scope', '$aside', '$q', '$http', '$timeout', function ($scope, $aside, $q, $http, $timeout) {
  $scope.areaData = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: 'Gradient Stacked Area Chart'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 234, 220, 340, 310]
      },
      {
        name: 'Line 3',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)'
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 132, 201, 334, 190, 130, 220]
      },
      {
        name: 'Line 4',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)'
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      },
      {
        name: 'Line 5',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 191, 0)'
            },
            {
              offset: 1,
              color: 'rgb(224, 62, 76)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 302, 181, 234, 210, 290, 150]
      }
    ]
  };
  $scope.barRaceData = {};
  $scope.updateFrequency = 2000;
  $scope.dimension = 0;
  $scope.countryColors = {
    Australia: '#00008b',
    Canada: '#f00',
    China: '#ffde00',
    Cuba: '#002a8f',
    Finland: '#003580',
    France: '#ed2939',
    Germany: '#000',
    Iceland: '#003897',
    India: '#f93',
    Japan: '#bc002d',
    'North Korea': '#024fa2',
    'South Korea': '#000',
    'New Zealand': '#00247d',
    Norway: '#ef2b2d',
    Poland: '#dc143c',
    Russia: '#d52b1e',
    Turkey: '#e30a17',
    'United Kingdom': '#00247d',
    'United States': '#b22234'
  };
  $scope.title = "Title from chart controller";
  $scope.content = "Content from chart controller";
  var aside = $aside({
    templateUrl: 'views/aside.html',
    show: false,
    placement: 'left',
    animation: 'am-slide-left',
    scope: $scope
  });
  $scope.showAside = function () {
    aside.$promise.then(aside.show);
  };
  $scope.hideModal = function () {
    aside.$promise.then(aside.hide);
  };

  $scope.getFlag = function (countryName) {
    if (!countryName) {
      return '';
    }
    return (
      $scope.flags.find(function (item) {
        return item.name === countryName;
      }) || {}
    ).emoji;
  }

  $scope.updateYear = function (year) {
    let source = $scope.data.slice(1).filter(function (d) {
      return d[4] === year;
    });
    let data = JSON.parse(JSON.stringify($scope.barRaceData));
    data.series[0].data = source;
    data.graphic.elements[0].style.text = year;
    $scope.barRaceData = {};
    $scope.barRaceData = data;
  }

  $scope.getData = function () {
    var promise1 = $http.get('https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json');
    var promise2 = $http.get('js/life-expectancy-table.json');
    $q.all([promise1, promise2]).then(function (responses) {
      $scope.flags = responses[0].data;
      $scope.data = responses[1].data;
      years = [];
      for (let i = 0; i < $scope.data.length; ++i) {
        if (years.length === 0 || years[years.length - 1] !== $scope.data[i][4]) {
          years.push($scope.data[i][4]);
        }
      }
      let startIndex = 10;
      let startYear = years[startIndex];
      $scope.barRaceData = {
        grid: {
          top: 10,
          bottom: 30,
          left: 150,
          right: 80
        },
        xAxis: {
          max: 'dataMax',
          axisLabel: {
            formatter: function (n) {
              return Math.round(n) + '';
            }
          }
        },
        dataset: {
          source: $scope.data.slice(1).filter(function (d) {
            return d[4] === startYear;
          })
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: 10,
          axisLabel: {
            show: true,
            fontSize: 14,
            formatter: function (value) {
              return value + '{flag|' + $scope.getFlag(value) + '}';
            },
            rich: {
              flag: {
                fontSize: 25,
                padding: 5
              }
            }
          },
          animationDuration: 300,
          animationDurationUpdate: 300
        },
        series: [
          {
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            itemStyle: {
              color: function (param) {
                return $scope.countryColors[param.value[3]] || '#5470c6';
              }
            },
            encode: {
              x: $scope.dimension,
              y: 3
            },
            label: {
              show: true,
              precision: 1,
              position: 'right',
              valueAnimation: true,
              fontFamily: 'monospace'
            }
          }
        ],
        // Disable init animation.
        animationDuration: 0,
        animationDurationUpdate: $scope.updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
          elements: [
            {
              type: 'text',
              right: 160,
              bottom: 60,
              style: {
                text: startYear,
                font: 'bolder 80px monospace',
                fill: 'rgba(100, 100, 100, 0.25)'
              },
              z: 100
            }
          ]
        }
      };
      for (let i = startIndex; i < years.length - 1; ++i) {
        (function (i) {
          $timeout(function () {
            $scope.updateYear(years[i + 1]);
          }, (i - startIndex) * $scope.updateFrequency);
        })(i);
      }
    });
  }
  $scope.getData();
}]);
