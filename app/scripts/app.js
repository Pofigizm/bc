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
    'ngSanitize',
    'ngResource',
    'ngRoute'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
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
  .run(function ($rootScope, $location) {

    $rootScope.currentUser = { auth: false };
    $location.path('/');

  });