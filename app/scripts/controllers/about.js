'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
