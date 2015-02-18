'use strict';

/**
 * @ngdoc function
 * @name mathsDemoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mathsDemoApp
 */
angular.module('mathsDemoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
