'use strict';

/**
 * @ngdoc function
 * @name bcApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bcApp
 */
angular.module('bcApp')
  .controller('LoginCtrl', function ($scope, $http, apiurl, $location, $rootScope, localStorageService) {

    $scope.user = {}; 
    $scope.error = false;

    $scope.hideErr = function( ){
      $scope.error = false;
    };

    $scope.doLogin = function( ){
      $scope.submitted = true;

      var postdata = JSON.stringify({
        username : $scope.user.name,
        password : $scope.user.password
      });
      
      $http({
        method: 'POST',
        withCredentials: true,
        url: apiurl + 'auth',
        headers:{
          'Content-Type':'application/json; charset=utf-8',
        },
        data: postdata
      })
      .success( function( getdata ) {
        $rootScope.currentUser = {
          auth: true,
          id: getdata.id,
          name: getdata.username
        }
        if( localStorageService.isSupported ){
          localStorageService.set( 'auth', true );
          localStorageService.set( 'id', getdata.id );
          localStorageService.set( 'name', getdata.username );
        }
        $location.path('/user');
      })
      .error( function( getdata) {
        $rootScope.currentUser = null;
        if( localStorageService.isSupported ){
          localStorageService.remove( 'auth' );
          localStorageService.remove( 'id' );
          localStorageService.remove( 'name' );
        }
        $scope.error = true;
      });
    };

  });
