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
    'ngRoute',
    'LocalStorageModule'
])
  .config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
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

    localStorageServiceProvider
      .setPrefix( 'bcApp' )
      .setNotify( true, true );

    //$locationProvider.html5Mode(true);

  })
  .run(function ($rootScope, $location, localStorageService, $http, apiurl ) {

    if( localStorageService.isSupported && localStorageService.get( 'auth' ) ){
      var user = {
        id: localStorageService.get( 'id' ),
        name: localStorageService.get( 'name' )
      };
      // if api has normal check state of authorization then change this
      $http({
        method: 'GET',
        withCredentials: true,
        url: apiurl + 'org/' + user.id + '/user/' + user.name + '.json',
        headers:{
          'Content-Type':'application/json; charset=utf-8'
        }
      })
      .success( function( getdata ){
        $rootScope.currentUser = {
          auth: true,
          id: getdata.id,
          name: getdata.username
        }
        $location.path('/');
      })
      .error( function( ){
        $rootScope.currentUser = null;
        $location.path('/'); 
      });
    } else {
      $rootScope.currentUser = null;
      $location.path('/'); 
    }
  });
