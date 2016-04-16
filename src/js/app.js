angular.module('app', [
  'ui.bootstrap',
  'ngRoute',
  'ui.router',
  'ngAnimate'
]).config(function ($stateProvider, $urlRouterProvider, conf) {
  $stateProvider
  .state('home', {
    url: '/',
    template: '<home></home>'
  })
  .state('office', {
    url: '/office',
    template: '<office></office>'
  });
  
  $urlRouterProvider.otherwise('/');

  console.log(conf);
});