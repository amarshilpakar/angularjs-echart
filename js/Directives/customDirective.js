app.directive('echarts', function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {   
      scope.$watch(attrs.data, function() {
        var option = scope.$eval(attrs.option);
        var echart = echarts.init(element[0], null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        if (option && typeof option === 'object') {
          echart.setOption(option);
        }
        window.addEventListener('resize', echart.resize);
      });
    }
  };
});
