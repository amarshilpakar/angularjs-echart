app.directive('echarts', function () {
  return {
    restrict: 'E',
    scope: {
      option: '='
    },
    link: function (scope, element, attrs) {   
      scope.$watch('option', function(newValue, oldValue) {
        var echart = echarts.init(element[0], null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        if (newValue && typeof newValue === 'object') {
          echart.setOption(newValue);
        }
        window.addEventListener('resize', echart.resize);
      });
    }
  };
});
