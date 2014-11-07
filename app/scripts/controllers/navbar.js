'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the bcApp
 */

angular.module('bcApp')
  .controller('NavbarCtrl', function ($scope, $location, $http, $rootScope, apiurl, $timeout, $log) {

    $scope.logout = function() {

      $http({
        method: 'GET',
        withCredentials: true,
        url: apiurl + 'logout',
        headers:{
          'Content-Type':'application/json; charset=utf-8',
        },
      })

      $rootScope.currentUser = { auth: false };
      
      $timeout( function() {

        console.log('http://104.236.35.119/api/logout response 302 Moved Temporarily');
        // http://104.236.35.119/api/logout response 302 Moved Temporarily
        // https://docs.angularjs.org/api/ng/service/$http
        // Note that if the response is a redirect, XMLHttpRequest will transparently follow it, meaning that the error callback will not be called for such responses.
        // redirect from timer

        $location.path('/');

      }, 1000);

    };
  });