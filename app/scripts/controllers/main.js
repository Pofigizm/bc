'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
