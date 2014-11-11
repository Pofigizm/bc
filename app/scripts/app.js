'use strict';

/**
 * @ngdoc overview
 * @name bcApp
 * @description
 * # bcApp
 *
 * Main module of the application.
 */

angular.module('bcApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);

  })
  .run(function ($rootScope, $location, $http, apiurl ) {

      $http({
        method: 'GET',
        withCredentials: true,
        url: apiurl + 'user.json',
        headers:{
          'Content-Type':'application/json'
        }
      })
      .success( function( getdata ){
        if( getdata.id ) {
          $rootScope.currentUser = {
            auth: true,
            id: getdata.id,
            name: getdata.username
          };
          $location.path('/');
        } else {
          $rootScope.currentUser = null;
          $location.path('/'); 
        }
      });

  });
