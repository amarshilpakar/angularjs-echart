var app = angular.module('app', ['ngAnimate', 'ui.router', 'mgcrea.ngStrap']);

//Route

app.config(
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("chart");
        $stateProvider
        .state('chart', {
            url: '/chart',
            templateUrl: 'views/chart.html',
            controller: 'chartController'
        })    
        
});





