'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('UserCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
