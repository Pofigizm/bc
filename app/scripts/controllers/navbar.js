'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the bcApp
 */

angular.module('bcApp')
  .controller('NavbarCtrl', function ($scope, $location, $http, $rootScope, apiurl, $timeout ) {

    $scope.logout = function() {

      $http({
        method: 'GET',
        withCredentials: true,
        url: apiurl + 'logout',
        headers:{
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
         
      $rootScope.currentUser = null;
    
      $timeout( function() {

        // $log.info('http://104.236.35.119/api/logout response 302 Moved Temporarily');
        // http://104.236.35.119/api/logout response 302 Moved Temporarily
        // https://docs.angularjs.org/api/ng/service/$http
        // Note that if the response is a redirect, XMLHttpRequest will transparently follow it, meaning that the error callback will not be called for such responses.
        // no-cache make respond 200, but no body. TODO --> Learn CORS more carefully. Understand why does not work.
        // redirect from timer

        $location.path('/');

      }, 1000);

    };
  });