angular.module('app').directive('office', function () {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/office/office.html',
    controller: function ($scope) {
      $scope.hello = 'world';
    }
  };
});