'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('UserCtrl', function ($scope, $http, apiurl, $rootScope) {
    
    $scope.userdata = {};

    if( !$rootScope.currentUser.auth ) $location.path('/');

    var user = $rootScope.currentUser;

    $http({
      method: 'GET',
      withCredentials: true,
      url: apiurl + 'org/' + user.id + '/user/' + user.email + '.json',
      headers:{
        'Content-Type':'application/json; charset=utf-8'
      }
    })
    .success( function( getdata ) {

      $scope.userdata = getdata;
   
    })
    .error( function( getdata) {

      //TODO - responce error

    });
  });
